import spaceShip from '../../assets/mapa/space-ship.webp'

function MapaGlobal() {
  return (
    <>
      <section 
        style={{width: '15rem', height: '20rem'}}
        className="flex col background-texto pad-1 mapa-munda">
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