import { useState } from 'react'
import type { Mochila } from '../App'
import SeleccionNivelpage from './dungeon/SeleccionNivelpage'
import PantallaDungeon from './dungeon/PantallaDungeon'
import type { EnemyStatscontrol } from './models/enemy.interfaces'
import { EMPTY_ENEMY, SLIME_HARD, SLIME_ROCK, SLIME_SOFT } from './initialData/enemys.init'
import type { PlayerStatsControl } from './models/player.interfaces'
import attackAnimation from '../assets/gif/ataque.gif'
import Animation1sec from './generics/Animation-1sec'
import { ARMORY } from './initialData/armory.init'
import fireDebuf from '../assets/debuf/fire.png'
import slowDebuf from '../assets/debuf/snail.png'

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
  const [showAttack, setShowAttack] = useState<boolean | null>(null)

  const updateEnemy = () => {
    const numberOfEnemy = Math.round(Math.random()*2)
    
      if(level === 3){
        setEnemy(numberOfEnemy === 1? SLIME_HARD: SLIME_ROCK)
      }else{
        setEnemy(JSON.parse(JSON.stringify(SLIME_SOFT)))
      }
  }

  function handleSelectLevel(val: boolean){
    setStartMission(val)
    updateEnemy()
  }

  function handleAttack(){
    setShowAttack(true)

    setEnemy((val) => {
      const lifeRest: number = val.life - (1*(playerStats.baseAttack+playerStats.bonos.attack))
      const finalLifeEnemy: number = lifeRest > 0? lifeRest : 0;
      
      const weapon = ARMORY[prop.playerStats.equipment.idWeapon || 999]
      // Slowness
      const isSlownessWeapon = weapon.special === "slowness"
      const applySlowness = Math.random() < (weapon.prop || 0)
      // Poison
      const isPoisonWeapon = weapon.special === "poison"
      const applyPoison = Math.random() < (weapon.prop || 0)

      console.log(Math.random() < (weapon.prop || 0),Math.random() , (weapon.prop || 0))

      const enemy:EnemyStatscontrol = {
        ...val,
        life: finalLifeEnemy,
        debuf:{
          slowness: isSlownessWeapon && applySlowness ? val.debuf.slowness++:  (val.debuf.slowness-1 >0? val.debuf.slowness-1 :0),
          poison: isPoisonWeapon && applyPoison ? val.debuf.poison++:  ((val.debuf.poison-1) >0? val.debuf.poison-1 :0),
        }
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
     setEnemy((val: EnemyStatscontrol) => {
      const life: number = val.life - val.debuf.poison
      const lifeFinal: number = life > 0? life: 0
      return {
        ...val,
        life: lifeFinal
      }
    })

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
        actions: 0,
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
              <Animation1sec
                show={showAttack}
                setShow={setShowAttack}
                animation={attackAnimation}
              />
              <section
                style={{position: 'absolute'}}
                className='flex row pad-1'>
                {enemy.debuf.poison > 0 &&
                  <img
                    src={fireDebuf}
                  />
                }
                {enemy.debuf.slowness > 0 &&
                  <img
                    src={slowDebuf}
                  />
                }
              </section>
              
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
                    onTouchEnd={() => handleAttack()}
                  >Golpear</button>
                  <button
                    disabled={!isTurnoJugador()}
                    onClick={() => handleShield()}
                    onTouchEnd={() => handleShield()}
                    >Defender</button>
                  <button
                    disabled={!isTurnoJugador()}
                    onTouchEnd={() => isTurnoJugador()}
                    >Pocion c</button>
                </div>
                <button
                  disabled={isTurnoJugador()}
                  onClick={() => handleEndTurno()}
                  onTouchEnd={() => handleEndTurno()}
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