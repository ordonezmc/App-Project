export const CREATE_SYNC_QUEUE_TABLE = `
CREATE TABLE IF NOT EXISTS sync_queue (
  id TEXT PRIMARY KEY NOT NULL,
  entidad TEXT,
  entidad_id TEXT,
  operacion TEXT,
  payload TEXT,
  estado TEXT DEFAULT 'PENDING',
  created_at TEXT,
  updated_at TEXT,
  error TEXT
);
`;
