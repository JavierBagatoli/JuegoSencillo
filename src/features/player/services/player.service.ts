import { api } from "../../../services/api";
import type { Player } from "../hooks/usePlayerContext";

export const controlerPlayer = {
  async getPlayer(): Promise<Player> {
    const { data } = await api.get<Player>(`/api/player`);
    return data;
  },

  async getRefreshPlayer(): Promise<Player> {
    const { data } = await api.get<Player>(`/api/player/refresh`);
    return data;
  },
}