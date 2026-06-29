import { api } from "./api";

export const controlerDungeon ={
    async getDungeons(idUser: number): Promise<number[]> {
    const { data } = await api.post<number[]>("/api/dungeon/list-dungeons", {
        idUser
    });
    return data;
  },

}