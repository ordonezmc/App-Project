export class EvaluateStageRecordUseCase {
  constructor(
    private irrigationRules: any,
    private diseaseRules: any,
    private harvestRules: any,
  ) {}

  async execute(etapa_actuaL_id: number, datos: any) {
    switch (etapa_actuaL_id) {
      case 2:
        return this.irrigationRules.evaluate(datos.frecuencia_riego);

      case 3:
        return this.diseaseRules.evaluate(
          datos.plantas_enfermas,
          datos.plantas_totales,
        );

      case 6:
        return this.harvestRules.evaluate(datos.kg_cosechados, datos.hectareas);

      default:
        return null;
    }
  }
}
