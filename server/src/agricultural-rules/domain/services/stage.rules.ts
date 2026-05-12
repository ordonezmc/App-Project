import { AgriculturalAlert } from '../interfaces/agricultural-alert.interface';

export class StageRules {
  evaluate(fechaInicio: Date, etapa: string): AgriculturalAlert | null {
    const hoy = new Date();

    const dias = Math.floor(
      (hoy.getTime() - fechaInicio.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (etapa === 'SIEMBRA' && dias > 60) {
      return {
        tipo: 'ETAPA',
        nivel: 'MEDIO',
        mensaje: 'El lote podría pasar a desarrollo vegetativo',
      };
    }

    return null;
  }
}
