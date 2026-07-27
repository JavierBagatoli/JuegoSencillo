import { api } from "../../../services/api";
import type { Profile } from "../hooks/useProfileContext";

export const controlerProfile = {
  
  async getDataProfile(): Promise<Profile> {
    const { data } = await api.get<Profile>(`/api/profile`);
    return data;
  },

  async postUpdateNameAndPhoto(newProfile: Profile): Promise<Profile> {
    const { data } = await api.post<Profile>(`/api/profile`, newProfile);
    return data;
  },
}