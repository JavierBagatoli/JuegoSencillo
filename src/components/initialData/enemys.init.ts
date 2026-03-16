import type { PlayerStatsControl } from "../models/player.interfaces";

export const EMPTY_ENEMY: PlayerStatsControl = {
    life: 0,
    lifeMax: 0,
    bonos: {
        defense: 1,
        attack: 0,
        actions: 1,
        luck: 1
    },
    baseAttack: 1,
    actions: 0,
    actionsMax: 1,
}

export const SLIME_SOFT: PlayerStatsControl = {
    life: 10,
    lifeMax: 10,
    bonos: {
        defense: 1,
        attack: 0,
        actions: 1,
        luck: 1
    },
    baseAttack: 1,
    actions: 0,
    actionsMax: 1,
}

export const SLIME_HARD: PlayerStatsControl = {
    life: 100,
    lifeMax: 100,
    bonos: {
        defense: 1,
        attack: 0,
        actions: 1,
        luck: 1
    },
    baseAttack: 5,
    actions: 0,
    actionsMax: 1,
}

export const SLIME_ROCK: PlayerStatsControl = {
    life: 80,
    lifeMax: 80,
    bonos: {
        defense: 1,
        attack: 0,
        actions: 1,
        luck: 1
    },
    baseAttack: 5,
    actions: 0,
    actionsMax: 1,
}