export class MarkAlertAsReadUseCase {
  constructor(private repository: any) {}

  async execute(id: string) {
    return this.repository.markAsRead(id);
  }
}
