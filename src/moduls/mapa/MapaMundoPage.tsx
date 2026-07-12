

import { CAPITAL_SHIPS } from '../../components/initialData/capitalShips.init'
import './MapaMundo.css'
import { useState } from 'react'

function MapaGlobalPage() {
  const [expandInfoIndex, setExpandInfoIndex] = useState<number>(-1)
  
  const handleExpandInfo = (index: number) => {
    setExpandInfoIndex(val => val === index? -1: index)
  }

  const filterShips = () => {
    let zone0 = CAPITAL_SHIPS.filter(s => s.zone === 0)
    let zone1 = CAPITAL_SHIPS.filter(s => s.zone === 1)
    let zone2 = CAPITAL_SHIPS.filter(s => s.zone === 2)
    let zone3 = CAPITAL_SHIPS.filter(s => s.zone === 3)

    return [zone0, zone1, zone2, zone3]
  }
  
  return (
    <>
      <section 
        className="flex col background-texto mapa-mundo max-h">
          <section className='flex col'>
          {
            filterShips().map((val, index) => 
              <div className='zone' key={index}>
                <span>Zona {index} - Drop: {index*5}%</span>
                <div>{
                  val.map((ship, i) => 
                    <div
                     key={i}
                     className='flex row no-wrap'>
                      <img 
                        onClick={() => handleExpandInfo(ship.id)}
                        src={ship.img}
                      />
                      {
                        <div className={`${expandInfoIndex === ship.id?"display-on":"display-off"} flex col display`}>
                          <span>{ship.name}</span>
                          <span>Capitan: {ship.owner}</span>
                          <span>Torres: {ship.levels.towers}, Defensas: {ship.levels.defense}, Sensores: {ship.levels.sensors}</span>
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