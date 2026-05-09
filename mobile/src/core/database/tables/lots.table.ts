export const CREATE_LOTS_TABLE = `
CREATE TABLE IF NOT EXISTS lote (
  id TEXT PRIMARY KEY NOT NULL,
  usuario_id TEXT,
  nombre TEXT,
  hectareas REAL,
  temperatura_min REAL,
  temperatura_max REAL,
  etapa_actual_id INTEGER,
  fecha_inicio TEXT,
  numero_plantas INTEGER,
  created_at TEXT,
  synced INTEGER DEFAULT 0,
  updated_at TEXT,
  deleted INTEGER DEFAULT 0
);
`;
