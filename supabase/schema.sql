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
