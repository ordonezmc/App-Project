import api from "../../../../core/network/api";
import { Lot } from "../../domain/entities/lot.entity";

export class LotsApiRepository {
  async create(data: Lot) {
    await api.post("/lotes", data);
  }

  async update(id: string, data: Partial<Lot>) {
    await api.patch(`/lotes/${id}`, data);
  }
}
