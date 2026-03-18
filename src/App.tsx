import {useEffect, useState } from 'react'
import './index.css'
import Dungeon from './components/Dungeon'
import ToolTipAtributo from './components/ToolTipAtributo'
import ComercioPage from './components/comercio/Comercio-page'
import InventarioPage from './components/inventario/Inventario-page'
import MapaGlobal from './components/mapa/Mapa-page'
import { PLAYER_INITIAL_DUNGEON } from './components/initialData/player.init'
import type { PlayerStatsControl } from './components/models/player.interfaces'

function App() {
  const [page, setPage] = useState<'crear' | 'mapa' | 'dungeon' | 'comercio' | 'inventario' | 'trabajar'>('mapa')
  const [mochila, setMochila] = useState<Mochila>({
    circuito: 0,
    metales: 0,
    cristales: 0,
    nucleosEnergeticos: 0
  })
  const [playerStats, setPlayerStats] = useState<PlayerStatsControl>(PLAYER_INITIAL_DUNGEON)
  const [showAsidenav, setShowAsidenav] = useState<boolean>(false)
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 431)

  const showPage = () => {
    switch(page){
      case 'mapa':
        return <MapaGlobal/>
      case 'dungeon':
        return <Dungeon 
          mochilla={mochila}
          updateMochila={setMochila}
          playerStats={playerStats}
          />
      case 'crear':
        return <ComercioPage
            mochila={mochila}
            updateMochila={setMochila}
          />
      case 'inventario':
        return <InventarioPage
          playerStats={playerStats}
          setEquipment={setPlayerStats}
        />
    }
  }

  return (
    <>
      <main className={isMobile?'':'desktop'}>
        {isMobile && !showAsidenav &&

        <button
          style={{position: 'absolute', zIndex: 1}}
          onClick={() => setShowAsidenav(val => !val)}>
          ➥
        </button>
        }

        {((showAsidenav && isMobile) ||!isMobile) &&
          <aside 
            style={{position: isMobile?'absolute':'relative', zIndex: 1}}
            className='menu-acciones'>
              {isMobile &&
              <button
                onClick={() => setShowAsidenav(val => !val)}>
                ➥
              </button>
              }
            <button
              className={'mapa' === page? 'active' : ''}
              onClick={() => setPage('mapa')}
            >
              Mapa
            </button>
            <button
              className={'trabajar' === page? 'active' : ''}
              onClick={() => setPage('trabajar')}
            >
              Trabajar
            </button>
            <button
              className={'crear' === page? 'active' : ''}
              onClick={() => setPage('crear')}
            >
              Crear
            </button>
            <button
              className={'comercio' === page? 'active' : ''}
              onClick={() => setPage('comercio')}
            >
              Comerciar
            </button>
            <button
              className={'dungeon' === page? 'active' : ''}
              onClick={() => setPage('dungeon')}
              >
              Dungeon
            </button>
            <button
              className={'inventario' === page? 'active' : ''}
              onClick={() => setPage('inventario')}
              >
              Inventario
            </button>

            
            <div className='flex col stats-section'>
              <h4 className='flex center'>Pociones:</h4>
              <ToolTipAtributo
                text='Velocidad'
                actualValue={0}
                maxValue={99}
              />
              <ToolTipAtributo
                text='Curacion'
                actualValue={0}
                maxValue={99}
              />
              <ToolTipAtributo
                text='Daño'
                actualValue={0}
                maxValue={99}
              />
            </div>
            <div className='flex col stats-section'>
              <h4 className='flex center'>Recusos</h4>
              <ToolTipAtributo
                text='Circuitos'
                actualValue={mochila.circuito}
                maxValue={999}
              />
              <ToolTipAtributo
                text='Nucleos'
                actualValue={mochila.nucleosEnergeticos}
                maxValue={999}
              />
              <ToolTipAtributo
                text='Metales'
                actualValue={mochila.metales}
                maxValue={999}
              />
              <ToolTipAtributo
                text='Cristales'
                actualValue={mochila.cristales}
                maxValue={999}
              />

              <div>
                <ToolTipAtributo
                  text='Atk'
                  actualValue={playerStats.baseAttack + playerStats.bonos.attack}
                  maxValue={999}
                />
                <ToolTipAtributo
                  text='Defense'
                  actualValue={playerStats.bonos.defense}
                  maxValue={999}
                />
              </div>
              
            </div>
          </aside>
        }
        <section>
          {
            showPage()
          }
        </section>
      </main>
    </>
  )
}

export default App

export interface Mochila{
  metales: number,
  nucleosEnergeticos: number,
  circuito: number,
  cristales: number,
}