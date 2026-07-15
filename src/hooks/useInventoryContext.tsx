import { createContext, useContext, useState } from "react";
import { controlerInventory } from "../services/inventory";

export interface EquipmentPlayer{
    idWeapon: number,
    idShield: number,
    idArmor: number,
    idRoom0: number,
    idRoom1: number,
    idRoom2: number,
    idRoom3: number,
    idRoom4: number,
}

export interface InvetoryItemPlayer{
  id: number;
  cantidad: number
}

interface InventoryContextType{
  equipment: EquipmentPlayer,
  inventory: InvetoryItemPlayer[],
  getEquipment: React.Dispatch<number>,
  getInventory: React.Dispatch<number>,
  getSetEquipment:React.Dispatch<{idUser: number,idSlot: string,playerIdinventory: number}>,
}

const baseEquipment = {
    idWeapon: 0,
    idShield: 0,
    idArmor: 0,
    idRoom0: 0,
    idRoom1: 0,
    idRoom2: 0,
    idRoom3: 0,
    idRoom4: 0,
}

const inventoryContext = createContext<InventoryContextType | null>(null);

export function InventoryProvider({ children }: any) {
  const [equipment, setEquipment] = useState<EquipmentPlayer>(baseEquipment);
  const [inventory, setInventory] = useState<InvetoryItemPlayer[]>([]);

  async function getEquipment(idUser: number) {
    controlerInventory.getEquipmentUser(idUser).then((val) => {
      setEquipment(val)
    })
  }

  async function getInventory(idUser: number) {
    controlerInventory.getInventoryUser(idUser).then((val) => {
      setInventory(val)
    })
  }

  async function getSetEquipment(data: {idUser: number,idSlot: string,playerIdinventory: number}){
    controlerInventory.getSetEquipment(data.idUser,data.idSlot,data.playerIdinventory).then((val) => {
      setEquipment(val)
    })
  }

  return (
    <inventoryContext.Provider value={{equipment, inventory, getEquipment , getInventory, getSetEquipment}}>
      {children}
    </inventoryContext.Provider>
  );
}

export function useInventory() {
  const context = useContext(inventoryContext);

  if (!context) {
    throw new Error("useInventory debe usarse dentro de InventoryProvider");
  }

  return context;
}


