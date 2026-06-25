import spaceHuman from '../../assets/ships/Humans.png'
import spaceHuman_2 from '../../assets/ships/Humans_2.png'
import spaceHuman_3 from '../../assets/ships/Humans_3.png'
import spaceAnulaki from '../../assets/ships/Anulaki.png'

import './MapaMundo.css'
import { useState } from 'react'

function MapaGlobalPage() {
  const [expandInfoIndex, setExpandInfoIndex] = useState<number>(-1)
  
  const handleExpandInfo = (index: number) => {
    setExpandInfoIndex(val => val === index? -1: index)
  }
  
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
                  [''].map((_v) => 
                    <div className='flex'>
                    <img 
                      onClick={() => handleExpandInfo(index)}
                      src={val}
                    />
                    {
                      <div className={`${expandInfoIndex === index?"display-on":"display-off"} flex col display`}>
                        <span>StarShipTrooper</span>
                        <span>Capitan: {'Jab'}</span>
                        <span>Torres: 1, Defensas: 2, Sensores: 1</span>
                      </div>
                    }

                    </div>
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