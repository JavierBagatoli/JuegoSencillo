import { createContext, useContext, useEffect, useState } from "react";
import { controlerProfile } from "../services/profile.service";
import { useAuth } from "../../../hooks/useAuth";

interface ProfileContextType{
  profile: Profile,
  getDataProfile: React.Dispatch<void>,
  postUpdateNameAndPhoto: React.Dispatch<Profile>,
}

export interface Profile{
  name: string,
  imgProfile: string,
}

const profileContext = createContext<ProfileContextType | null>(null);

export function ProfileProvider({ children }: any) {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile>({
    name: 'No Name',
    imgProfile: '0'
  });

  useEffect(()=>{
    getDataProfile()
  },[user])
  
  async function getDataProfile() {
    controlerProfile.getDataProfile().then(val => setProfile(val))
  }

  async function postUpdateNameAndPhoto(data: Profile) {
    controlerProfile.postUpdateNameAndPhoto(data).then(val => setProfile(val))
  }

  return (
    <profileContext.Provider value={{profile, getDataProfile, postUpdateNameAndPhoto}}>
      {children}
    </profileContext.Provider>
  );
}

export function useProfile() {
  const context = useContext(profileContext);

  if (!context) {
    throw new Error("useProfile debe usarse dentro de ProfileProvider");
  }

  return context;
}


