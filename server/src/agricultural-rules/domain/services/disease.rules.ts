import { AgriculturalAlert } from '../interfaces/agricultural-alert.interface';

export class DiseaseRules {
  evaluate(plantasEnfermas: number, totalPlantas: number): AgriculturalAlert {
    const porcentaje = (plantasEnfermas / totalPlantas) * 100;

    if (porcentaje <= 10) {
      return {
        tipo: 'ENFERMEDAD',
        nivel: 'BAJO',
        mensaje: 'Monitorear evolución de sigatoka',
      };
    }

    if (porcentaje <= 30) {
      return {
        tipo: 'ENFERMEDAD',
        nivel: 'MEDIO',
        mensaje: 'Aplicar fumigación preventiva',
      };
    }

    return {
      tipo: 'ENFERMEDAD',
      nivel: 'ALTO',
      mensaje: 'Intervención inmediata requerida',
    };
  }
}
