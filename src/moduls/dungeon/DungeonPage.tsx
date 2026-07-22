import { useState } from 'react'
import type { Mochila } from '../../App'
import PantallaDungeon from './PantallaDungeon'
import fireDebuf from '../../assets/debuf/fire.png'
import slowDebuf from '../../assets/debuf/snail.png'
import SeleccionNivelPage from './SeleccionNivelPage'
import type { PlayerStatsControl } from '../../components/models/player.interfaces'
import Animation1sec from '../../components/generics/Animation1Sec'
import type { levelsAvalibles } from '../../components/models/levels-avalibles.interfaces'
import AnimationDropItem from '../../components/generics/AnimationDropItem'
import type { TypesOfDrop } from '../../components/models/typesOfDrops.enum'
import "./DungeonPage.css"
import { useDungeon } from '../../hooks/useDungeonContext'

function DungeonPage(
  prop: {
    mochilla: Mochila,
    updateMochila: Function,
    playerStats: PlayerStatsControl
  }
) {
  const dungeonProv = useDungeon()
  const {enemy} = useDungeon()
  const [level, setLevel] = useState<levelsAvalibles>(0)
  const [startMission, setStartMission] = useState<boolean>(false)
  const [playerStats, setplayerStats] = useState<PlayerStatsControl>(prop.playerStats)
  const [turno, setTurno] = useState<'Jugador' | 'Oponente'>('Jugador');
  const [showAttack, setShowAttack] = useState<boolean | null>(null)
  const [varLevel, setVarLevel] = useState<0 | 1 | 2 | 3>(0)
  const [dropToShow, setDropToShow] = useState<TypesOfDrop>("none")
  const [showDamage, setShowDamage] = useState<"successDefense" | "takeDamage" | "none">("none")
  const [vectorOfActions, setVectorOfActions] = useState<string[]>([])

  function handleSelectLevel(val: boolean){
    setStartMission(val)
  }

  function handleAttack(){
    setShowAttack(true)
    setVectorOfActions(val => [...val, "atk"])
    setplayerStats(val => {
      const final: PlayerStatsControl = {
        ...val,
        actions: val.actions+1
      }
      return final
    })

    markEndOfTurn();
  }

  /* //retornar el item que gano, para activar la animacion
      if(newMetales){
        setDropToShow("metal")
      }else if(newNucleos){
        setDropToShow("cores")
      }else if(newCircuitos){
        setDropToShow("circuit")
      }else if(newCristales){
        setDropToShow("crystal")        
      }else{
        setDropToShow("none")
      }
  */

  function isTurnoJugador(){
    return 'Jugador' === turno
  }

  function markEndOfTurn(){
    if(playerStats.actions+1 >= playerStats.actionsMax + playerStats.bonos.actions){
      setTurno('Oponente')
    }
  }

  function handleShield(){
    setVectorOfActions(val => [...val, "def"])
    setplayerStats((val) => {
      const final: PlayerStatsControl = {
        ...val,
        bonos:{
          ...val.bonos,
          defense: val.bonos.defense+1
        },
        actions: val.actions+1
      }

      return final
    })

    markEndOfTurn();
  }

  const controlOfAnimationDamage = (ataque: number, defense:number, enemyLife: number) => {
    if(enemyLife <= 0){
      return
    }else if(defense-ataque < 0){ //Mejorar
      setShowDamage("takeDamage")
    }else{
      setShowDamage("successDefense")
    }
    setTimeout(() => {setShowDamage("none")}, 1000)
  }

  function handleEndTurno(){
    dungeonProv?.endTurnEnemy({
      idUser: 1,
      actions: vectorOfActions
    })

    setVectorOfActions([])
    setplayerStats((val: PlayerStatsControl) => {
      const ataque = enemy!.life > 0? 1: 0;
      controlOfAnimationDamage(ataque, val.bonos.defense, enemy!.life)
      const defensaFinal = val.bonos.defense-ataque > 0? val.bonos.defense-ataque : 0;
      const atk = ataque-val.bonos.defense
      const ataqueAVida = atk > 0? atk : 0
      const vidaFinal = defensaFinal == 0? val.life-ataqueAVida : val.life
      

      if(vidaFinal <= 0){prop.playerStats.life = 0}
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

    const addEnemy: boolean = enemy!.life <= 0
    
    if(addEnemy){
      setVarLevel(Math.floor(Math.random()*4) as 0 | 1 | 2 | 3)
    }

    setTurno('Jugador');
  }

  return (
      <section className='flex center max-w'> 
        <section className='dungeon-port b2 background-inventario'>
          <span style={{color: 'white'}}>
            </span>
          {
            startMission?
              <>
                <Animation1sec
                  setShow={setShowAttack}
                  show={showAttack}
                />
                <AnimationDropItem
                  setShow={setDropToShow}
                  typeDrop={dropToShow}
                />
                <section
                  style={{position: 'absolute'}}
                  className='flex row pad-1'>
                  {(enemy?.debuf.poison || 0) > 0 &&
                    <img
                      src={fireDebuf}
                    />
                  }
                  {(enemy?.debuf.poison || 0) > 0 &&
                    <img
                      src={slowDebuf}
                    />
                  }
                </section>
                <PantallaDungeon
                  classname={`${showDamage === "takeDamage"?"dungeon-view-damage": showDamage === "successDefense"?"dungeon-view-defense":""}`}
                  playerStats={playerStats}
                  statusEnemy={enemy!}
                  levelSelected={level}
                  startMission={(val: boolean) => handleSelectLevel(val)}
                  varLevel={varLevel}
                />
                {prop.playerStats.life > 0 &&
                  <div className='flex col pad-05 buttons'>
                  {prop.playerStats.life}
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
                      >Pocion c</button>
                  </div>
                  <button
                    disabled={isTurnoJugador()}
                    onClick={() => handleEndTurno()}
                  >Terminar Turno</button>
                </div>

                }
              </>
            :
              <SeleccionNivelPage
                level={level}
                updateLevel={(val: levelsAvalibles) => setLevel(val)}
                startMission={(val: boolean) => handleSelectLevel(val)}
              />
          }
        </section>
      </section>
  )
}

export default DungeonPage;