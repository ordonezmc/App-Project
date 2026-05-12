import { LotsRepositoryImpl } from "../../infrastructure/repositories/lots.repository.impl";

export class GetLotsUseCase {
  private repository = new LotsRepositoryImpl();

  async execute(userId: string) {
    return this.repository.getAll(userId);
  }
}
