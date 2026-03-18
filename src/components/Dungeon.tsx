import { useState } from 'react'
import type { Mochila } from '../App'
import SeleccionNivelpage from './dungeon/SeleccionNivelpage'
import PantallaDungeon from './dungeon/PantallaDungeon'
import type { EnemyStatscontrol } from './models/enemy.interfaces'
import { EMPTY_ENEMY, SLIME_HARD, SLIME_ROCK, SLIME_SOFT } from './initialData/enemys.init'
import type { PlayerStatsControl } from './models/player.interfaces'

function Dungeon(
  prop: {
    mochilla: Mochila,
    updateMochila: Function,
    playerStats: PlayerStatsControl
  }
) {
  const [enemy, setEnemy] = useState<EnemyStatscontrol>(EMPTY_ENEMY)
  const [level, setLevel] = useState<number>(0)
  const [startMission, setStartMission] = useState<boolean>(false)
  const [playerStats, setplayerStats] = useState<PlayerStatsControl>(prop.playerStats)
  const [turno, setTurno] = useState<'Jugador' | 'Oponente'>('Jugador');

  const updateEnemy = () => {
    const numberOfEnemy = Math.round(Math.random()*2)
    
      if(level === 3){
        setEnemy(numberOfEnemy === 1? SLIME_HARD: SLIME_ROCK)
      }else{
        setEnemy(SLIME_SOFT)
      }
  }

  function handleSelectLevel(val: boolean){
    setStartMission(val)
    updateEnemy()
  }

  function handleAttack(){
    setEnemy((val) => {
      const lifeRest: number = val.life - (1*(playerStats.baseAttack+playerStats.bonos.attack))
      const finalLifeEnemy: number = lifeRest > 0? lifeRest : 0
      
      const enemy:EnemyStatscontrol = {
        ...val,
        life: finalLifeEnemy
      }
      
      return enemy;
    })

    setplayerStats(val => {
      return {
        ...val,
        acciones: val.actions++
      }
    })

    prop.updateMochila((val:Mochila) => {
      const suerte: number = 1
      const newMetales = Math.random()* 100 < 10*suerte ? 1: 0
      const newNucleos= Math.random()* 100 < 6*suerte ? 1: 0
      const newCircuitos = Math.random()* 100 < 4*suerte ? 1: 0
      const newCristales = Math.random()* 100 < 1*suerte ? 1: 0

      return {
        metales: val.metales + newMetales,
        nucleosEnergeticos: val.nucleosEnergeticos + newNucleos,
        circuito: val.circuito + newCircuitos,
        cristales: val.cristales + newCristales,
      }
    }
    )

    markEndOfTurn();
  }

  function isTurnoJugador(){
    return 'Jugador' === turno
  }

  function markEndOfTurn(){
    if(playerStats.actions+1 >= playerStats.actionsMax + playerStats.bonos.actions){
      setTurno('Oponente')
    }
  }

  function handleShield(){
    setplayerStats((val) => {
      return {
        ...val,
        bonos:{
          ...val.bonos,
          defensa: val.bonos.defense+1
        },
        acciones: val.actions++
      }
    })

    markEndOfTurn();
  }

  function handleEndTurno(){
    setplayerStats((val: PlayerStatsControl) => {
      const ataque = enemy.life > 0? 1: 0;
      const defensaFinal = val.bonos.defense-ataque > 0? val.bonos.defense-ataque : 0;
      const atk = ataque-val.bonos.defense
      const ataqueAVida = atk > 0? atk : 0
      const vidaFinal = defensaFinal == 0? val.life-ataqueAVida : val.life
      
      const statusFinal: PlayerStatsControl = {
        ...val,
        life: vidaFinal,
        bonos: {
          ...val.bonos,
          defense: defensaFinal,
        },
        actions: 0
      }

      return statusFinal
    })
    const addEnemy: boolean = enemy.life <= 0
    
    if(addEnemy){
      setEnemy((val: EnemyStatscontrol) => {
        let typeOfEnemy: number = Math.random() * 10
        return {
          ...val,
          lifeMax: Number((val.lifeMax*typeOfEnemy).toPrecision(3)),
          life: Number((val.lifeMax*typeOfEnemy).toPrecision(3)),
        }
      })
    }
    if(enemy.life <= 0){
      updateEnemy()
    }
    setTurno('Jugador');
  }

  return (
    <section className='flex center max-w'> 
      <section className='dungeon-port'>
        <span style={{color: 'white'}}>
          </span>
        {
          startMission?
            <>
              <PantallaDungeon
                playerStats={playerStats}
                statusEnemy={enemy}
                startMission={(val: boolean) => handleSelectLevel(val)}
                />
                <div className='flex col pad-05 buttons'>
                
                <div className='flex row buttons'>
                  <button
                    disabled={!isTurnoJugador()}
                    onClick={() => handleAttack()}
                  >Golpear</button>
                  <button
                    disabled={!isTurnoJugador()}
                    onClick={() => handleShield()}
                    >Defender</button>
                  <button
                    disabled={!isTurnoJugador()}
                    >Pocion</button>
                </div>
                <button
                  onClick={() => handleEndTurno()}
                >Terminar Turno</button>
              </div>
            </>
          :
            <SeleccionNivelpage
              level={level}
              updateLevel={(val: number) => setLevel(val)}
              startMission={(val: boolean) => handleSelectLevel(val)}
            />
        }
      </section>
    </section>
  )
}

export default Dungeon;