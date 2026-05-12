export class EvaluateStageRecordUseCase {
  constructor(
    private irrigationRules: any,
    private diseaseRules: any,
    private harvestRules: any,
  ) {}

  async execute(etapa: string, datos: any) {
    switch (etapa) {
      case 'SIEMBRA':
        return this.irrigationRules.evaluate(datos.frecuencia_riego);

      case 'DESARROLLO':
        return this.diseaseRules.evaluate(
          datos.plantas_enfermas,
          datos.plantas_totales,
        );

      case 'COSECHA':
        return this.harvestRules.evaluate(datos.kg_cosechados, datos.hectareas);

      default:
        return null;
    }
  }
}
