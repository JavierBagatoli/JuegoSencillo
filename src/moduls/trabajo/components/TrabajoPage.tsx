import mechanicalStation from '../../../assets/works/Mechanic-Spaceship.png'
import architecStation from '../../../assets/works/Architec-Spaceship.png'
import fuelStation from '../../../assets/works/Fuel-Spaceship.png'


import './TrabajoPage.css'

function TrabajoPage(props: {updateWork: Function}) {
  const infoWork = [{
    img: mechanicalStation,
    text: 'Reparar nave a otro jugador'
  },{
    img: architecStation,
    text: 'Crear planos para nuevas salas'
  },{
    img: fuelStation,
    text: 'Suministrar combustible'
  },
]
  const handleWork = () =>{
    props.updateWork()
  }

  return (
    <>
      <section 
        style={{flexWrap: 'nowrap'}}
        className="flex col background-texto mapa-mundo max-h">
          {infoWork.map((val) => 
            <div className='detail-job flex row'>
              <img src={val.img}></img>
              <div className='flex col'>
                  <p style={{color: 'white'}} className='flex row wrap'>{val.text}</p>
                  <button onClick={() => handleWork()}>Trabajar</button>
              </div>
            </div>
          )}          
      </section>
    </>
  )
}

export default TrabajoPage