import type { EquipmentPlayer, InvetoryItemPlayer } from "../hooks/useInventoryContext";
import { api } from "./api";

export const controlerInventory = {
  async getEquipmentUser(idUser: number): Promise<EquipmentPlayer> {
    const { data } = await api.get<EquipmentPlayer>(`/api/inventory/${idUser}`);
    return data;
  },
  async getInventoryUser(idUser: number): Promise<InvetoryItemPlayer[]> {
    const { data } = await api.get<InvetoryItemPlayer[]>(`/api/inventory/${idUser}/inventory`);
    return data;
  },

  async getSetEquipment(idUser: number,idSlot: string,playerIdinventory: number): Promise<EquipmentPlayer> {
    const { data } = await api.get<EquipmentPlayer>(`/api/inventory/${idUser}/set/${idSlot}/${playerIdinventory}`);
    return data;
  },
}