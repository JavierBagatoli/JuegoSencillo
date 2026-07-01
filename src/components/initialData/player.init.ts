import type { PlayerStatsControl } from "../models/player.interfaces";

export const PLAYER_INITIAL_DUNGEON: PlayerStatsControl = {
    life: 10,
    lifeMax: 10,
    id: 1,
    bonos: {
        defense: 1,
        attack: 0,
        actions: 1,
        luck: 1
    },
    baseAttack: 1,
    actions: 0,
    actionsMax: 1,
    equipment: {
        idWeapon: null,
        idArmor: null,
        idShield: null
    },
    room:{
        r0:0,
        r1:0,
        r2:0,
        r3:0,
        r4:0,
    },
    money: 100,
    platimun: 10,
}