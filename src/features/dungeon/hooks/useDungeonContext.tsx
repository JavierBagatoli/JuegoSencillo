import { createContext, useContext, useState } from "react";
import type { EnemyStatscontrol } from "../models/enemy.interfaces";
import { controlerDungeon, type createMonster, type endTurn } from "../services/dungeon";
import { usePlayer } from "../../player/hooks/usePlayerContext";

interface DungeonContextType{
  enemy: EnemyStatscontrol | null,
  endTurnEnemy: React.Dispatch<endTurn>,
  createEnemy: React.Dispatch<createMonster>
}

const dungeonContext = createContext<DungeonContextType | null>(null);

export function DungeonProvider({ children }: any) {
  const player = usePlayer();
  const [enemy, setEnemy] = useState<EnemyStatscontrol | null>(null);

  async function createEnemy(data: createMonster) {
    controlerDungeon.postCreateMonster(data.idUser, data.level).then((val) => {
      setEnemy(val)
    })
  }

  async function endTurnEnemy(data: endTurn) {
    controlerDungeon.postEndTurn(data).then((val) => {
      setEnemy(val);
      if("newResourses" in val){
        player.getRefreshPlayer()
      }
    })
  }

  return (
    <dungeonContext.Provider value={{enemy, endTurnEnemy, createEnemy}}>
      {children}
    </dungeonContext.Provider>
  );
}

export function useDungeon() {
  const context = useContext(dungeonContext);

  if (!context) {
    throw new Error("useDungeon debe usarse dentro de DungeonProvider");
  }

  return context;
}


