import spaceShip from '../../assets/mapa/space-ship.webp'

function MapaGlobal() {
  return (
    <>
      <section 
        className="flex col background-texto mapa-mundo">
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
              src={spaceShip}
            />
          </div>
          <div  style={{transform: 'translateX(70px)'}}>
            <img 
              src={spaceShip}
            />
          </div>
      </section>
    </>
  )
}

export default MapaGlobal