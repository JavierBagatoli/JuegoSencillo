import buttonMina from '../../assets/buttons/button-mina-level-dungeon.jpg'
import buttonLaberinto from '../../assets/buttons/button-laberinto-level-dungeon.jpg'
import buttonAscensor from '../../assets/buttons/button-ascensor-level-dungeon.jpg'
import buttonPecio from '../../assets/buttons/button-pecio-level-dungeon.jpg'

import "./SeleccionNivelPage.css"
function SeleccionNivelPage(
  props: {
    level: number,
    updateLevel: Function
    startMission: Function
  }
) {

  const handleLevel = (val: number) =>{
    props.updateLevel(val)
  }

  const handleStartMission = () =>{
    props.startMission(true)
  }

  //Me gustaria que los botones sean imagenes

  return (
    <>
      <section id="dungeon-selector-level">
        <div 
          className="flex col pad-1 dungeon-selector-buttons"
          style={{justifyContent: 'space-between', height: '95%'}}
          >
          <div 
            className="flex col">
            <button onClick={() => handleLevel(0)}>
              <span>Minas</span>
              <img src={buttonMina}/>
            </button>

            <button onClick={() => handleLevel(1)}>
              <span>Laberinto</span>
              <img src={buttonLaberinto}/>
            </button>

            <button onClick={() => handleLevel(2)}>
              <span>Ascensor</span>
              <img src={buttonAscensor}/>
            </button>

            <button onClick={() => handleLevel(3)}>
              <span>Pecio espacial</span>
              <img src={buttonPecio}/>
            </button>
          </div>

          <button onClick={() => handleStartMission()}>
            Iniciar Exploracion
          </button>
        </div>
      </section>

    </>
  )
}

export default SeleccionNivelPage