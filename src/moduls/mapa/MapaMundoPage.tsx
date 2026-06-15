import spaceHuman from '../../assets/ships/Humans.png'
import spaceHuman_2 from '../../assets/ships/Humans_2.png'
import spaceHuman_3 from '../../assets/ships/Humans_3.png'
import spaceAnulaki from '../../assets/ships/Anulaki.png'

import './MapaMundo.css'

function MapaGlobalPage() {
  return (
    <>
      <section 
        className="flex col background-texto mapa-mundo max-h">
          <div>
            <img 
              className='shipStyle'
              src={spaceHuman}
            />
          </div>
          <div style={{transform: 'translateX(90px)'}}>
            <img 
              className='shipStyle'
              src={spaceHuman_2} 
            />
          </div>
          <div style={{transform: 'translateX(20px)'}}>
            <img
              className='shipStyle'
              src={spaceHuman_3}
            />
          </div>
          <div  style={{transform: 'translateX(70px)'}}>
            <img
              className='shipStyle'
              src={spaceAnulaki}
            />
          </div>
      </section>
    </>
  )
}

export default MapaGlobalPage