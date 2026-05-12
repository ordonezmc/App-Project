export interface Lot {
  id: string;
  usuario_id: string;
  nombre: string;
  hectareas: number;
  temperatura_min: number;
  temperatura_max: number;
  etapa_actual: number;
  fecha_inicio: string;
  numero_plantas: number;
  synced?: number;
}