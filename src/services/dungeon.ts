import type { EnemyStatscontrol } from "../components/models/enemy.interfaces";
import { api } from "./api";

export const controlerDungeon = {
  async getDungeons(idUser: number): Promise<number[]> {
    const { data } = await api.post<number[]>("/api/dungeon/list-dungeons", {
        idUser
    });
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