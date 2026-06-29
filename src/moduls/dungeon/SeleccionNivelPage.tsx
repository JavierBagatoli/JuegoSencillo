import buttonMina from '../../assets/buttons/button-mina-level-dungeon.jpg'
import buttonLaberinto from '../../assets/buttons/button-laberinto-level-dungeon.jpg'
import buttonAscensor from '../../assets/buttons/button-ascensor-level-dungeon.jpg'
import buttonPecio from '../../assets/buttons/button-pecio-level-dungeon.jpg'
import buttonStart from '../../assets/buttons/button-start-dungeon.png'

import "./SeleccionNivelPage.css"
import { useState } from 'react'
import type { levelsAvalibles } from '../../components/models/levels-avalibles.interfaces'

function SeleccionNivelPage(
  props: {
    level: levelsAvalibles,
    updateLevel: Function
    startMission: Function
  }
) {
  const [idLevelSected, updateIdLevelSelected] = useState<number>(-1)

  const handleLevel = (val: number) =>{
    updateIdLevelSelected(val)
    props.updateLevel(val)
  }

  const handleStartMission = () =>{
    props.startMission(true)
  }

  return (
    <>
      <section className='b2'>
        <div 
          className="flex col pad-1 center dungeon-selector-buttons"
          style={{justifyContent: 'space-between', height: '95dvh'}}
          >
          <div 
            style={{paddingTop: '1rem'}}
            className="flex col"
            >
            <button className='invisible button-img' onClick={() => handleLevel(0)}>
              <span className='mid-contrast'>Minas</span>
              <img
                className={`${idLevelSected !== 0? 'unselected': ''}`}
                src={buttonMina}/>
            </button>

            <button className='invisible button-img'  onClick={() => handleLevel(1)}>
              <span className='mid-contrast'>Laberinto</span>
              <img
                className={`${idLevelSected !== 1? 'unselected': ''}`}
                src={buttonLaberinto}/>
            </button>

            <button className='invisible button-img' onClick={() => handleLevel(2)}>
              <span className='mid-contrast'>Ascensor</span>
              <img 
                className={`${idLevelSected !== 2? 'unselected': ''}`}
                src={buttonAscensor}/>
            </button>

            <button
              className='invisible button-img' 
              onClick={() => handleLevel(3)}>
              <span className='mid-contrast'>Pecio espacial</span>
              <img
                className={`${idLevelSected !== 3? 'unselected': ''}`}
                src={buttonPecio}/>
            </button>
          </div>

          <button 
            className='invisible button-img'
            disabled={idLevelSected === -1}
            onClick={() => handleStartMission()}>
              <span className='mid-contrast center'>Iniciar Exploración</span>
              <img 
              className={`${idLevelSected === -1? 'disabled': ''} no-shadow`}
              src={buttonStart}/>
          </button>
        </div>
      </section>

    </>
  )
}

export default SeleccionNivelPage