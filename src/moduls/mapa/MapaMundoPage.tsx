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
          <section className='flex col'>
          {
            [spaceHuman,spaceHuman_2,spaceHuman_3,spaceAnulaki].map((val, index) => 
              <div className='zone'>
                <span>Zona {index} - Drop: {index*5}%</span>
                <div>{
                  [''].map(_v => 
                    <img 
                      src={val}
                    />
                  )
                  }
                </div>
              </div>
            )
          }
          
          </section>          
      </section>
    </>
  )
}

export default MapaGlobalPage