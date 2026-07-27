import { createContext, useContext, useEffect, useState } from "react";
import { controlerPlayer } from "../services/player.service";
import { useAuth } from "../../../hooks/useAuth";

interface PlayerContextType{
  player: Player,
  getDataPlayer: React.Dispatch<void>,
  getRefreshPlayer: React.Dispatch<void>,
}

export interface Player{
  id: string,
  name: string,
  wallet: Wallet
  resources: Resources,
}

export interface Wallet{
  credits: number,
  platino: number,
}

export interface Resources{
  circuits: number,
  cores: number,
  metals: number,
  crystals: number,
}

const PLAYER_DATA: Player = {
  id: "0",
  name: "TEST",
  wallet: {
    credits: 0,
    platino: 0
  },
  resources: {
    circuits: 0,
    cores: 0,
    metals: 0,
    crystals: 0,
  }

}

const playerContext = createContext<PlayerContextType | null>(null);

export function PlayerProvider({ children }: any) {
  const { user } = useAuth();
  const [player, setPlayer] = useState<Player>(PLAYER_DATA);

  useEffect(()=>{
    getDataPlayer()
  },[user])


  async function getDataPlayer() {
    const idToken = await user?.getIdToken();
    
    if(!idToken) return
    controlerPlayer.getPlayer().then((val) => {
      if("error" in val) return

      setPlayer(_v => {
        return val
      })
    })
  }

  async function getRefreshPlayer() {
    controlerPlayer.getRefreshPlayer().then(val => setPlayer(val))
  }

  return (
    <playerContext.Provider value={{player, getDataPlayer, getRefreshPlayer}}>
      {children}
    </playerContext.Provider>
  );
}

export function usePlayer() {
  const context = useContext(playerContext);

  if (!context) {
    throw new Error("usePlayer debe usarse dentro de PlayerProvider");
  }

  return context;
}


