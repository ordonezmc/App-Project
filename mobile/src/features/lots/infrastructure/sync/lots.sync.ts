import { syncPendingData } from "../../../../core/network/sync.service";

export async function syncLots() {
  await syncPendingData();
}
