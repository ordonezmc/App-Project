export class CreateStageRecordDTO {
  loteId!: string;

  etapaId!: number;

  tipoRegistro!: string;

  datos!: Record<string, any>;

  fecha!: Date;
}
