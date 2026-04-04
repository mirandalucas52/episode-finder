-- Activer l'extension pgvector
create extension if not exists vector with schema extensions;

-- Supprimer l'ancienne table si elle existe
drop table if exists search_cache;

-- Table de cache sémantique avec embeddings vectoriels
create table search_cache (
  id bigint generated always as identity primary key,
  original_query text not null,
  normalized_query text not null,
  embedding vector(768) not null,
  result jsonb not null,
  tmdb_data jsonb,
  hit_count integer not null default 1,
  created_at timestamptz not null default now()
);

-- Index pour recherche vectorielle (cosine similarity)
create index idx_search_cache_embedding
  on search_cache
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Index texte comme fallback
create index idx_search_cache_normalized_query
  on search_cache (normalized_query);

-- Fonction de recherche sémantique
create or replace function match_search_cache(
  query_embedding vector(768),
  match_threshold float default 0.90,
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
    1 - (sc.embedding <=> query_embedding) as similarity
  from search_cache sc
  where 1 - (sc.embedding <=> query_embedding) > match_threshold
  order by sc.embedding <=> query_embedding
  limit match_count;
$$;

-- Fonction pour incrémenter le compteur de hits
create or replace function increment_hit_count(query_text text)
returns void as $$
begin
  update search_cache
  set hit_count = hit_count + 1
  where normalized_query = query_text;
end;
$$ language plpgsql;

-- Fonction pour incrémenter par ID
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
