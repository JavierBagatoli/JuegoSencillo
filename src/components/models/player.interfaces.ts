export default interface StatsControl{
  life: number,
  lifeMax: number,
  bonos: {
    defense: number,
    attack: number,
    actions: number,
    luck: number
  }
  baseAttack: number;
  actions: number,
  actionsMax: number,
}

export interface PlayerStatsControl extends StatsControl{
  equipment: EquipmentUser,
  room: EquipmentShipUser,
  money: number,
  platimun: number,
}

export interface EquipmentUser{
  idWeapon: number | null,
  idShield: number | null,
  idArmor: number | null,
}

export interface EquipmentShipUser{
  r0: number,
  r1: number,
  r2: number,
  r3: number,
  r4: number,
}


export interface InvetoryPlayer{
  id: number;
  cantidad: number
}