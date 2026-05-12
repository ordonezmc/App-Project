export class Alert {
  constructor(
    public id: string,
    public loteId: string,
    public tipo: string,
    public nivel: string,
    public mensaje: string,
    public leida: boolean = false,
    public createdAt?: Date,
  ) {}
}
