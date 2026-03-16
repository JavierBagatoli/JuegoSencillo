import type { EnemyStatscontrol } from "../models/enemy.interfaces"

export const EMPTY_ENEMY: EnemyStatscontrol = {
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

export const SLIME_SOFT: EnemyStatscontrol = {
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

export const SLIME_HARD: EnemyStatscontrol = {
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

export const SLIME_ROCK: EnemyStatscontrol = {
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