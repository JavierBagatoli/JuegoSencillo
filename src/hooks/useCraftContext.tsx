import { createContext, useContext, useEffect, useState } from "react";
import { controlerCraft } from "../services/craft";

interface CarftContextType{
  items: itemToSell[],
  getCosts: React.Dispatch<number>,
  craftItem:React.Dispatch<{idUser: number, idItem: number}>,
}

export interface itemToSell{
    title: string,
    description: string,
    cost: ItemCost,
    id: number,
}

export interface ItemCost {
  circuito?: number,
  nucleo?: number,
  metal?: number,
  cristal?: number
}

const carftContext = createContext<CarftContextType | null>(null);

export function CarftProvider({ children }: any) {
  useEffect(() => {
    if(items.length === 0){
      getCosts()
    }
  }, [])

  const [items, setItems] = useState<itemToSell[]>([]);

  async function getCosts() {
    controlerCraft.getCosts().then((val) => {
      setItems(val)
    })
  }

  async function craftItem(data: {idUser: number, idItem: number}) {
    controlerCraft.craftItem(data.idUser, data.idItem).then((val) => {
      console.log(val)
    })
  }

  return (
    <carftContext.Provider value={{items, getCosts, craftItem}}>
      {children}
    </carftContext.Provider>
  );
}

export function useCarft() {
  const context = useContext(carftContext);

  if (!context) {
    throw new Error("useCarft debe usarse dentro de CarftProvider");
  }

  return context;
}