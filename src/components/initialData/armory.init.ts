import escopeta from "../../assets/icons/escopeta.png"
import armadura from "../../assets/icons/armadura.png"
import shield from "../../assets/icons/shield.png"
import type { Weapon } from "../models/items-fight.interfaces"

export const ARMORY: Record<number, Weapon> ={
    999: {
      nombre: 'Puños',
      descripcion: '',
      id: 999,
      type: 'weapon',
      icon: null,
      damage: 1,
      defense: 0,
      uses: 0,
    },
    0: {
      nombre: 'Escopeta',
      descripcion: 'Arma antigua',
      id: 0,
      type: 'weapon',
      icon: escopeta,
      damage: 5,
      defense: 0,
      uses: 0,
    },
    1: {
      nombre: 'Armadura',
      descripcion: 'Armadura antigua',
      id: 1,
      type: 'armor',
      icon: armadura,
      damage: 0,
      defense: 3,
      uses: 0,
    },
    2: {
      nombre: 'Escudo',
      descripcion: 'Escudo',
      id: 2,
      type: 'shield',
      icon: shield,
      damage: 0,
      defense: 1,
      uses: 0,
    },
    3: {
      nombre: 'Escopeta 2',
      descripcion: 'Arma antigua',
      id: 3,
      type: 'weapon',
      icon: '',
      damage: 0,
      defense: 0,
      uses: 0,
    },
  }