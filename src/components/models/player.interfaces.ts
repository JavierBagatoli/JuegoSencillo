export interface PlayerStatsControl{
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