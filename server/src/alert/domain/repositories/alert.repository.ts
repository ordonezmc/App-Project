import { Alert } from '../entities/alert.entity';

export abstract class AlertRepository {
  abstract create(alert: Alert): Promise<Alert>;
  abstract findAll(): Promise<Alert[]>;
  abstract findByLote(loteId: string): Promise<Alert[]>;
  abstract markAsRead(id: string): Promise<Alert>;
}
