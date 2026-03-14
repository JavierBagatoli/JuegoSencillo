import spaceShip from '../../assets/mapa/space-ship.webp'

function MapaGlobal() {
  return (
    <>
      <section 
        style={{width: '150px', height: '200px'}}
        className="flex col background-texto pad-1">
        <img 
            src={spaceShip}
            style={{transform: 'rotate(90deg)'}}
        />
        <img 
            src={spaceShip}
            style={{transform: 'rotate(90deg) translateY(-90px)'}}
        />
        <img 
            src={spaceShip}
            style={{transform: 'rotate(90deg) translateY(-20px)'}}
        />
        <img 
            src={spaceShip}
            style={{transform: 'rotate(90deg) translateY(-70px)'}}
        />

      </section>
    </>
  )
}

export default MapaGlobal