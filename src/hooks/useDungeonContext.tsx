import { createContext, useContext, useState } from "react";
import type { EnemyStatscontrol } from "../components/models/enemy.interfaces";
import { controlerDungeon, type createMonster, type endTurn } from "../services/dungeon";

interface DungeonContextType{
  enemy: EnemyStatscontrol | null,
  endTurnEnemy: React.Dispatch<endTurn>,
  createEnemy: React.Dispatch<createMonster>
}

const dungeonContext = createContext<DungeonContextType | null>(null);

export function DungeonProvider({ children }: any) {
  const [enemy, setEnemy] = useState<EnemyStatscontrol | null>(null);

  async function createEnemy(data: createMonster) {
    controlerDungeon.postCreateMonster(data.idUser, data.level).then((val) => {
      setEnemy(val)
    })
  }

  async function endTurnEnemy(data: endTurn) {
    console.log("aaa")
    controlerDungeon.postEndTurn(data).then((val) => {
      console.log(val, "hola");
      setEnemy(prev => prev)
    })
  }

  return (
    <dungeonContext.Provider value={{enemy, endTurnEnemy, createEnemy}}>
      {children}
    </dungeonContext.Provider>
  );
}

export function useDungeon() {
  return useContext(dungeonContext);
}


