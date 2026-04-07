-- Supprimer l'ancienne table si elle existe
drop table if exists search_cache;

-- Table de cache pour les recherches (clé = query + mode)
create table search_cache (
  id bigint generated always as identity primary key,
  original_query text not null,
  normalized_query text not null,
  search_mode text not null default 'episode',
  result jsonb not null,
  tmdb_data jsonb,
  hit_count integer not null default 1,
  verified boolean not null default false,
  created_at timestamptz not null default now(),
  unique (normalized_query, search_mode)
);

-- Index pour recherche rapide
create index idx_search_cache_query_mode
  on search_cache (normalized_query, search_mode);

-- Extension pour la recherche floue
create extension if not exists pg_trgm;

-- Index trigram pour la similarité textuelle
create index idx_search_cache_trgm
  on search_cache
  using gin (normalized_query gin_trgm_ops);

-- Fonction de recherche par similarité textuelle filtrée par mode
create or replace function match_similar_query(
  search_query text,
  query_mode text default 'episode',
  match_threshold float default 0.45,
  match_count int default 1
)
returns table (
  id bigint,
  original_query text,
  normalized_query text,
  result jsonb,
  tmdb_data jsonb,
  verified boolean,
  similarity float
)
language sql stable
as $$
  select
    sc.id,
    sc.original_query,
    sc.normalized_query,
    sc.result,
    sc.tmdb_data,
    sc.verified,
    similarity(sc.normalized_query, search_query)::float as similarity
  from search_cache sc
  where sc.search_mode = query_mode
    and similarity(sc.normalized_query, search_query) > match_threshold
  order by similarity(sc.normalized_query, search_query) desc
  limit match_count;
$$;

-- Fonction pour incrémenter le compteur de hits par ID
create or replace function increment_hit_count_by_id(row_id bigint)
returns void as $$
begin
  update search_cache
  set hit_count = hit_count + 1
  where id = row_id;
end;
$$ language plpgsql;

-- Row Level Security
alter table search_cache enable row level security;

-- ═══════════════════════════════════════════════════
-- Rate limiting table (sliding window per IP)
-- ═══════════════════════════════════════════════════
create table if not exists rate_limits (
  id bigint generated always as identity primary key,
  ip_hash text not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_rate_limits_ip_time
  on rate_limits (ip_hash, created_at desc);

-- Cleanup function (removes entries older than 1 hour)
create or replace function cleanup_rate_limits()
returns void as $$
begin
  delete from rate_limits where created_at < now() - interval '1 hour';
end;
$$ language plpgsql;

alter table rate_limits enable row level security;

-- ═══════════════════════════════════════════════════
-- Feedback table (thumbs up/down on results)
-- ═══════════════════════════════════════════════════
create table if not exists result_feedback (
  id bigint generated always as identity primary key,
  cache_id bigint references search_cache(id) on delete set null,
  query text not null,
  vote smallint not null check (vote in (-1, 1)),
  wrong_title text,
  correct_title text,
  search_mode text,
  created_at timestamptz not null default now()
);

create index if not exists idx_feedback_cache_id
  on result_feedback (cache_id);

create index if not exists idx_feedback_corrections
  on result_feedback (search_mode, created_at desc)
  where vote = -1 and correct_title is not null;

alter table result_feedback enable row level security;
