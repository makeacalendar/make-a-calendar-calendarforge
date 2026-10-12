CREATE EXTENSION IF NOT EXISTS pgcrypto;
CREATE TABLE IF NOT EXISTS calendar_projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  year integer NOT NULL CHECK (year BETWEEN 1 AND 9998),
  settings jsonb NOT NULL DEFAULT '{"weekStartsOn":"monday","layers":{"federalHolidays":true}}'::jsonb,
  events jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS calendar_projects_updated_idx ON calendar_projects(updated_at DESC);
