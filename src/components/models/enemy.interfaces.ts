import type StatsControl from "./player.interfaces";

export interface EnemyStatscontrol extends StatsControl{
    debuf: {
        poison: number,
        slowness: number,
    }
}