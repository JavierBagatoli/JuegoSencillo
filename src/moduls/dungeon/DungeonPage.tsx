import { useState } from 'react'
import type { Mochila } from '../../App'
import PantallaDungeon from './PantallaDungeon'
import fireDebuf from '../../assets/debuf/fire.png'
import slowDebuf from '../../assets/debuf/snail.png'
import SeleccionNivelPage from './SeleccionNivelPage'
import type { PlayerStatsControl } from '../../components/models/player.interfaces'
import type { EnemyStatscontrol } from '../../components/models/enemy.interfaces'
import { EMPTY_ENEMY, SLIME_HARD, SLIME_ROCK, SLIME_SOFT } from '../../components/initialData/enemys.init'
import Animation1sec from '../../components/generics/Animation1Sec'
import { ARMORY } from '../../components/initialData/armory.init'
import type { levelsAvalibles } from '../../components/models/levels-avalibles.interfaces'
import AnimationDropItem from '../../components/generics/AnimationDropItem'
import type { TypesOfDrop } from '../../components/models/typesOfDrops.enum'
import "./DungeonPage.css"

function DungeonPage(
  prop: {
    mochilla: Mochila,
    updateMochila: Function,
    playerStats: PlayerStatsControl
  }
) {
  const [enemy, setEnemy] = useState<EnemyStatscontrol>(EMPTY_ENEMY)
  const [level, setLevel] = useState<levelsAvalibles>(0)
  const [startMission, setStartMission] = useState<boolean>(false)
  const [playerStats, setplayerStats] = useState<PlayerStatsControl>(prop.playerStats)
  const [turno, setTurno] = useState<'Jugador' | 'Oponente'>('Jugador');
  const [showAttack, setShowAttack] = useState<boolean | null>(null)
  const [varLevel, setVarLevel] = useState<0 | 1 | 2 | 3>(0)
  const [enemyToShow, setEnemyToShow] = useState<number>(0)
  const [dropToShow, setDropToShow] = useState<TypesOfDrop>("none")
  const [showDamage, setShowDamage] = useState<"successDefense" | "takeDamage" | "none">("none")

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

    setplayerStats(val => {
      const final: PlayerStatsControl = {
        ...val,
        actions: val.actions+1
      }
      return final
    })

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

      const enemy:EnemyStatscontrol = {
        ...val,
        life: finalLifeEnemy,
        debuf:{
          slowness: isSlownessWeapon && applySlowness ? val.debuf.slowness++:  (val.debuf.slowness-1 >0? val.debuf.slowness-1 :0),
          poison: isPoisonWeapon && applyPoison ? val.debuf.poison++:  ((val.debuf.poison-1) >0? val.debuf.poison-1 :0),
        }
      }
      
      if(enemy.life === 0){
        updateInvetory();
      }
      return enemy;
    })

    markEndOfTurn();
  }

  const updateInvetory = () => {
    prop.updateMochila((val:Mochila) => {
      const suerte: number = 1
      const newMetales = Math.random()* 100 < 10*suerte ? 1: 0
      const newNucleos= Math.random()* 100 < 6*suerte ? 1: 0
      const newCircuitos = Math.random()* 100 < 4*suerte ? 1: 0
      const newCristales = Math.random()* 100 < 1*suerte ? 1: 0

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

      return {
        metales: val.metales + newMetales,
        nucleosEnergeticos: val.nucleosEnergeticos + newNucleos,
        circuito: val.circuito + newCircuitos,
        cristales: val.cristales + newCristales,
      }
    })
  }

  function isTurnoJugador(){
    return 'Jugador' === turno
  }

  function markEndOfTurn(){
     setEnemy((val: EnemyStatscontrol) => {
      const life: number = val.life - val.debuf.poison
      const lifeFinal: number = life > 0? life: 0
      const final: EnemyStatscontrol = {
        ...val,
        life: lifeFinal
      }
      return final;
    })

    if(playerStats.actions+1 >= playerStats.actionsMax + playerStats.bonos.actions){
      setTurno('Oponente')
    }
  }

  function handleShield(){
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

  const controlOfAnimationDamage = (ataque: number, defense:number) => {
    if(defense-ataque < 0){ //Mejorar
      setShowDamage("takeDamage")
    }else{
      setShowDamage("successDefense")
    }
    setTimeout(() => {setShowDamage("none")}, 1000)
  }

  function handleEndTurno(){
    setplayerStats((val: PlayerStatsControl) => {
      const ataque = enemy.life > 0? 1: 0;
      controlOfAnimationDamage(ataque, val.bonos.defense)
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

      setVarLevel(Math.floor(Math.random()*4) as 0 | 1 | 2 | 3)
      setEnemyToShow(Math.floor(Math.random()*5))
    }
    if(enemy.life <= 0){
      updateEnemy()
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
                classname={`${showDamage === "takeDamage"?"dungeon-view-damage": showDamage === "successDefense"?"dungeon-view-defense":""}`}
                playerStats={playerStats}
                statusEnemy={enemy}
                levelSelected={level}
                startMission={(val: boolean) => handleSelectLevel(val)}
                varLevel={varLevel}
                enemyToShow={enemyToShow}
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