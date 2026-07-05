import buttonMina from '../../assets/buttons/button-mina-level-dungeon.jpg'
import buttonLaberinto from '../../assets/buttons/button-laberinto-level-dungeon.jpg'
import buttonAscensor from '../../assets/buttons/button-ascensor-level-dungeon.jpg'
import buttonPecio from '../../assets/buttons/button-pecio-level-dungeon.jpg'
import buttonStart from '../../assets/buttons/button-start-dungeon.png'

import buttonZ1_0 from '../../assets/buttons/button-z1-0.jpg'
import buttonZ1_1 from '../../assets/buttons/button-z1-1.jpg'
import buttonZ1_2 from '../../assets/buttons/button-z1-2.jpg'
import buttonZ1_3 from '../../assets/buttons/button-z1-3.jpg'

import "./SeleccionNivelPage.css"
import { useEffect, useState } from 'react'
import type { levelsAvalibles } from '../../components/models/levels-avalibles.interfaces'
import { controlerDungeon } from '../../services/dungeon'
import ButtonImage from '../../components/generics/component/ButtonImage'

function SeleccionNivelPage(
  props: {
    level: levelsAvalibles,
    updateLevel: Function
    startMission: Function
  }
) {
  const [idLevelSected, updateIdLevelSelected] = useState<number>(-1)

  useEffect(() => {
    console.log(
      controlerDungeon.getDungeons(1)
    )
  }, []);

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
            <ButtonImage 
              onClick={() => handleLevel(0)}
              name='Minas'
              idPost={0}
              idLevelSected={idLevelSected}
              srcImg={buttonMina}
            />
            <ButtonImage 
              onClick={() => handleLevel(1)}
              name='Laberinto'
              idPost={1}
              idLevelSected={idLevelSected}
              srcImg={buttonLaberinto}
            />
            <ButtonImage 
              onClick={() => handleLevel(2)}
              name='Ascensor'
              idPost={2}
              idLevelSected={idLevelSected}
              srcImg={buttonAscensor}
            />
            <ButtonImage 
              onClick={() => handleLevel(3)}
              name='Pecio espacial'
              idPost={3}
              idLevelSected={idLevelSected}
              srcImg={buttonPecio}
            />
          </div>
          <div 
            style={{paddingTop: '1rem'}}
            className="flex col"
            >
            <ButtonImage 
              onClick={() => handleLevel(4)}
              name='Colonia minera'
              idPost={4}
              idLevelSected={idLevelSected}
              srcImg={buttonZ1_0}
            />
            <ButtonImage 
              onClick={() => handleLevel(5)}
              name='Exploracion'
              idPost={5}
              idLevelSected={idLevelSected}
              srcImg={buttonZ1_1}
            />
            <ButtonImage 
              onClick={() => handleLevel(6)}
              name='Profundidades'
              idPost={6}
              idLevelSected={idLevelSected}
              srcImg={buttonZ1_2}
            />
            <ButtonImage 
              onClick={() => handleLevel(7)}
              name='Ruinas Alien'
              idPost={7}
              idLevelSected={idLevelSected}
              srcImg={buttonZ1_3}
            />
          </div>

          <button 
            className='invisible button-img'
            disabled={idLevelSected === -1 || idLevelSected > 3}
            onClick={() => handleStartMission()}>
              <span className='mid-contrast center'>Iniciar Exploración</span>
              <img 
              className={`${idLevelSected === -1 || idLevelSected > 3? 'disabled': ''} no-shadow`}
              src={buttonStart}/>
          </button>
        </div>
      </section>

    </>
  )
}

export default SeleccionNivelPage