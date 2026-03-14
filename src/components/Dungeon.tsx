import { useState } from 'react'
import sword from '../assets/icons/sword.png'
import shield from '../assets/icons/shield.png'
import potion from '../assets/icons/potion.png'
import bestiario from '../assets/monster/monsters'
import ToolTipAtributo from './ToolTipAtributo'
import type { Mochila } from '../App'


function Dungeon(
  prop: {
    mochilla: Mochila,
    updateMochila: Function
  }
) {
  const [opponentLive, setOpponentLive] = useState<ControlVidaDungeon>({
    live: 10,
    maxLive: 10
  })

  
  const [statusJugador, setStatusJugador] = useState<ControlPersonaDungeon>({vida: 10,
      vidaMax: 10,
      bonos: {
        defensa: 1,
        ataque: 1,
        acciones: 1,
        suerte: 1
      },
      acciones: 0,
      accionesMaximas: 1,
    })

  const [turno, setTurno] = useState<'Jugador' | 'Oponente'>('Jugador');

  function handleAttack(){
    setOpponentLive((val) => {
      const lifeRest: number = val.live - (1*statusJugador.bonos.ataque)
      const finalLifeEnemy: number = lifeRest > 0? lifeRest : 0
      return {
        ...val,
        live: finalLifeEnemy,
      }
    })

    setStatusJugador(val => {
      return {
        ...val,
        acciones: val.acciones++
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
    if(statusJugador.acciones+1 >= statusJugador.accionesMaximas + statusJugador.bonos.acciones){
      setTurno('Oponente')
    }
  }

  function handleShield(){
    setStatusJugador((val) => {
      return {
        ...val,
        bonos:{
          ...val.bonos,
          defensa: val.bonos.defensa+1
        },
        acciones: val.acciones++
      }
    })

    markEndOfTurn();
  }

  function handleEndTurno(){
    setStatusJugador((val) => {
      const ataque = opponentLive.live > 0? 1: 0;
      const defensaFinal = val.bonos.defensa-ataque > 0? val.bonos.defensa-ataque : 0;
      const atk = ataque-val.bonos.defensa
      const ataqueAVida = atk > 0? atk : 0
      const vidaFinal = defensaFinal == 0? val.vida-ataqueAVida : val.vida
      

      return {
        ...val,
        vida: vidaFinal,
        bonos: {
          ...val.bonos,
          defensa: defensaFinal,
        },
        acciones: 0
      }
    })
    const addEnemy: boolean = opponentLive.live <= 0
    if(addEnemy){
      setOpponentLive((val) => {
        let typeOfEnemy: number = Math.random() * 10
        return {
          maxLive: Number((val.maxLive*typeOfEnemy).toPrecision(3)),
          live: Number((val.maxLive*typeOfEnemy).toPrecision(3)),
        }
      })
    }
    setTurno('Jugador')
  }

  return (
    <>
    <section className='dungeon-port'>
      {
        statusJugador.vida > 0?

      
      <div className='dungeon-view flex col'>
        <div className='flex row center'>
          <div className='flex col'>
            <ToolTipAtributo
              text='Vida'
              actualValue={opponentLive.live}
              maxValue={opponentLive.maxLive}
            />


          {opponentLive.live > 0 ?
            <img 
              className='monster'
              src={bestiario.monsterT1[0]}/>
            : <div className='monster'></div>
          }
          </div>
        </div>
        <div id='toolbar' className='flex row center'>
          <img src={shield}/>
          <img src={sword}/>
          <img src={potion}/>
        </div>
        <ToolTipAtributo
          text='Vida'
          actualValue={statusJugador.vida}
          maxValue={statusJugador.vidaMax}
        />
        <ToolTipAtributo
          text='Acciones'
          actualValue={statusJugador.acciones}
          maxValue={statusJugador.accionesMaximas + statusJugador.bonos.acciones}
        />
        <ToolTipAtributo
          text='Defensa'
          actualValue={statusJugador.bonos.defensa}
          maxValue={99}
        />
      </div>
      : <div className='flex row center'>
        <h2>Quedas inconciente</h2>

      </div>
      }
      <div className='flex row pad-05'>
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
        <button
          onClick={() => handleEndTurno()}
        >Terminar Turno</button>
      </div>
    </section>
    </>
  )
}

export default Dungeon

interface ControlVidaDungeon{
  live: number,
  maxLive: number
}

interface ControlPersonaDungeon{
    vida: number,
    vidaMax: number,
    bonos: {
      defensa: number,
      ataque: number,
      acciones: number,
      suerte: number
    }
    acciones: number,
    accionesMaximas: number,
  }