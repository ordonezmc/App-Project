export class Note {
  constructor(
    public readonly id: string,
    public readonly lote_id: string | null,
    public readonly titulo: string,
    public readonly description: string,
    public readonly imagen_url: string | null,
    public readonly fecha: Date,
    public readonly created_at?: Date,
  ) {}
}
