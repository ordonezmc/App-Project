import { LotsRepositoryImpl } from "../../infrastructure/repositories/lots.repository.impl";

export class UpdateLotUseCase {
  private repository = new LotsRepositoryImpl();

  async execute(id: string, data: any) {
    await this.repository.update(id, data);
  }
}
