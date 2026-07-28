import type { EnemyStatscontrol } from "../models/enemy.interfaces";
import { api } from "../../../services/api";


export const controlerDungeon = {
  async getDungeons(): Promise<number[]> {
    const { data } = await api.get<number[]>("/api/dungeon/list-dungeons");
    return data;
  },
  async postCreateMonster(idUser: number, level: number): Promise<EnemyStatscontrol> {
    const { data } = await api.post<EnemyStatscontrol>("/api/dungeon/create-monster", {
        idUser, level
    });
    return data;
  },

  async postEndTurn(endTurn: endTurn): Promise<EnemyStatscontrol> {
    const { data } = await api.post<EnemyStatscontrol>("/api/dungeon/end-turn", {
        ...endTurn
    });
    return data;
  },
}

export interface endTurn{
  idUser: number,
  actions: string[]
}

export interface createMonster{
  idUser: number,
  level: number,
}