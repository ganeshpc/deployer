-- For clickhouse not for postgres 
-- execute this on clickhouse query executor

CREATE TABLE log_events (
  event_id UUID,
  timestamp DateTime MATERIALIZED now(),
  project_id Nullable(String),
  deployment_id Nullable(String),
  log String,
  metadata Nullable(String)
)
ENGINE=MergeTree PARTITION BY toYYYYMM(timestamp)
ORDER BY (timestamp);