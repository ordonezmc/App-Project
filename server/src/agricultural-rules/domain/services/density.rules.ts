import { AgriculturalAlert } from '../interfaces/agricultural-alert.interface';

export class DensityRules {
  evaluate(hectareas: number, plantas: number): AgriculturalAlert | null {
    const densidad = plantas / hectareas;

    if (densidad < 1000) {
      return {
        tipo: 'DENSIDAD',
        nivel: 'MEDIO',
        mensaje: 'Muy pocas plantas por hectárea',
      };
    }

    if (densidad > 2500) {
      return {
        tipo: 'DENSIDAD',
        nivel: 'ALTO',
        mensaje: 'Demasiadas plantas por hectárea',
      };
    }

    return null;
  }
}
