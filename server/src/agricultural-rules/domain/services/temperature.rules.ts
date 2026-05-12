import { AgriculturalAlert } from '../interfaces/agricultural-alert.interface';

export class TemperatureRules {
  evaluate(temperatura: number): AgriculturalAlert | null {
    if (temperatura < 18 || temperatura > 35) {
      return {
        tipo: 'TEMPERATURA',
        nivel: 'ALTO',
        mensaje: 'La temperatura no es adecuada para el cultivo',
      };
    }

    return null;
  }
}
