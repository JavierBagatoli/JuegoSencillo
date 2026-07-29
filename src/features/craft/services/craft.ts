import { api } from "../../../services/api";
import type { itemToSell } from "../models/craft.interfaces";

export const controlerCraft = {
  async getCosts(): Promise<itemToSell[]> {
    const { data } = await api.get<itemToSell[]>(`/api/crafting/costs`);
    return data;
  },

  async craftItem( idItem: number): Promise<void> {
    const { data } = await api.post<void>(`/api/crafting/buy`,{
      idItem
    });
    return data;
  },
}