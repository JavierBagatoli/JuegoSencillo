import type StatsControl from "./player.interfaces";

export interface EnemyStatscontrol extends StatsControl{
    idTypeImage: number,
    debuf: {
        poison: number,
        slowness: number,
    }
}