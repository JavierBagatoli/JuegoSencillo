import spaceShip from '../../assets/mapa/space-ship.webp'
import ufoShip from '../../assets/mapa/ufo.png'
import './MapaMundo.css'

function MapaGlobalPage() {
  return (
    <>
      <section 
        className="flex col background-texto mapa-mundo max-h">
          <div>
            <img 
              src={spaceShip}
            />
          </div>
          <div style={{transform: 'translateX(90px)'}}>
            <img 
              src={spaceShip} 
            />
          </div>
          <div style={{transform: 'translateX(20px)'}}>
            <img
              style={{width: 'auto'}} 
              className='ufo'
              src={ufoShip}
            />
          </div>
          <div  style={{transform: 'translateX(70px)'}}>
            <img
              style={{width: 'auto'}} 
              className='ufo'
              src={ufoShip}
            />
          </div>
      </section>
    </>
  )
}

export default MapaGlobalPage