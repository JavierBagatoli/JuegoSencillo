import type { itemToSell } from "../hooks/useCraftContext";
import { api } from "./api";

export const controlerCraft = {
  async getCosts(): Promise<itemToSell[]> {
    const { data } = await api.get<itemToSell[]>(`/api/crafting/costs`);
    return data;
  },

  async craftItem(idUser: number, idItem: number): Promise<void> {
    const { data } = await api.post<void>(`/api/crafting/buy`,{
      idUser,
      idItem
    });
    return data;
  },
}