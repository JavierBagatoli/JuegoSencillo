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