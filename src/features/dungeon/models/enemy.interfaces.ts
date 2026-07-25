import type StatsControl from "../../../components/models/player.interfaces";

export interface EnemyStatscontrol extends StatsControl{
    idTypeImage: number,
    debuf: {
        poison: number,
        slowness: number,
    }
}