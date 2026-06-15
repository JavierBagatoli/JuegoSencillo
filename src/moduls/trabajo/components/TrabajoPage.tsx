import mechanicalStation from '../../../assets/works/Mechanic-Spaceship.png'
import architecStation from '../../../assets/works/Architec-Spaceship.png'
import fuelStation from '../../../assets/works/Fuel-Spaceship.png'


import './TrabajoPage.css'

function TrabajoPage() {
  return (
    <>
      <section 
        style={{flexWrap: 'nowrap'}}
        className="flex col background-texto mapa-mundo max-h">
          <div className='detail-job flex row'>
            <img src={mechanicalStation}></img>
            <div className='flex col'>
                <p style={{color: 'white'}} className='flex row wrap'>Reparar nave a otro jugador</p>
                <button>Trabajar</button>
            </div>
          </div>

          <div className='detail-job flex row'>
            <img src={architecStation}></img>
            <div className='flex col'>
                <span style={{color: 'white'}}>Crear planos para nuevas salas</span>
                <button>Trabajar</button>
            </div>
          </div>

          <div className='detail-job flex row'>
            <img src={fuelStation}></img>
            <div className='flex col'>
                <span style={{color: 'white'}}>Suministrar combustible</span>
                <button>Trabajar</button>
            </div>
          </div>
          
      </section>
    </>
  )
}

export default TrabajoPage