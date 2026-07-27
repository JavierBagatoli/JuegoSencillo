
import { api } from "../../../services/api";
import type { EquipmentPlayer, InvetoryItemPlayer } from "../models/inventory";

export const controlerInventory = {
  async getEquipmentUser(_idUser: number): Promise<EquipmentPlayer> {
    const { data } = await api.get<EquipmentPlayer>(`/api/inventory/equipment`);
    return data;
  },
  async getInventoryUser(): Promise<InvetoryItemPlayer[]> {
    const { data } = await api.get<InvetoryItemPlayer[]>(`/api/inventory/inventory`);
    console.log("data inventario", data)
    return data;
  },

  async getSetEquipment(idSlot: string,playerIdinventory: number): Promise<EquipmentPlayer> {
    const { data } = await api.get<EquipmentPlayer>(`/api/inventory/set/${idSlot}/${playerIdinventory}`);
    return data;
  },
}