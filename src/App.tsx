import { useState } from 'react'
import './index.css'
import { PLAYER_INITIAL_DUNGEON } from './components/initialData/player.init'
import type { InvetoryPlayer, PlayerStatsControl } from './components/models/player.interfaces'
import MapaGlobalPage from './moduls/mapa/MapaMundoPage'
import DungeonPage from './moduls/dungeon/DungeonPage'
import ComercioPage from './moduls/comercio/ComercioPage'
import InventarioPage from './moduls/inventario/InventarioPage'
import ToolTipAtributo from './components/ToolTipAtributo'
import type { MenuOptions } from './components/models/menu.interfaces'
import ConfigPerfilPage from './moduls/configPerfil/ConfigPerfilPage'
import BatallaInvasionPage from './moduls/invasion-battle/BatallaInvasionPage'
import TrabajoPage from './moduls/trabajo/components/TrabajoPage'
import CrearPage from './moduls/crear/CrearPage'
import { INVENTARY } from './components/initialData/inventary.init'
import LoginPage from './moduls/login/components/LoginPage'

function App() {
  const [page, setPage] = useState<MenuOptions>('mapa')
  const [mochila, setMochila] = useState<Mochila>({
    circuito: 0,
    metales: 0,
    cristales: 3,
    nucleosEnergeticos: 0
  })
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const [playerStats, setPlayerStats] = useState<PlayerStatsControl>(PLAYER_INITIAL_DUNGEON)
  const [showAsidenav, setShowAsidenav] = useState<boolean>(false)
  const [invetory, setInventory] = useState<InvetoryPlayer[]>(INVENTARY)
  const isMobile: boolean =window.innerWidth < 720

  const menuOptions: MenuOptions[] = ['mapa', 'trabajar', 'crear', 'comercio', 'dungeon', 'invasion', 'inventario', 'configPerfil']

  const updateMoney = () => {
    setPlayerStats((val) => {
      return {...val,
        money: val.money+10
      }
    })
  }


  const showPage = () => {
    switch(page){
      case 'trabajar':
        return <TrabajoPage
          updateWork={() => updateMoney()}
        />
      case 'configPerfil':
        return <ConfigPerfilPage/>
      case 'mapa':
        return <MapaGlobalPage/>
      case 'crear':
        return <CrearPage
          mochila={mochila}
          updateMochila={setMochila}
          invetory={invetory}
          updateInventario={setInventory}
          />
      case 'dungeon':
        return <DungeonPage 
          mochilla={mochila}
          updateMochila={setMochila}
          playerStats={playerStats}
          />
      case 'invasion':
        return <BatallaInvasionPage/>
      case 'comercio':
        return <ComercioPage/>
      case 'inventario':
        return <InventarioPage
          playerStats={playerStats}
          setEquipment={setPlayerStats}
          invetory={invetory}
        />
    }
  }

  return (
    <>
      {
        isLogin?<main className={`principal-view ${isMobile?'':'desktop'}`}>
        {isMobile && !showAsidenav &&

        <button
          style={{position: 'absolute', zIndex: 1}}
          onClick={() => setShowAsidenav(val => !val)}>
          ➥
        </button>
        }

        {((showAsidenav && isMobile) ||!isMobile) &&
          <aside 
            style={{position: isMobile?'absolute':'relative', zIndex: 2}}
            className='menu-acciones'>
              {isMobile &&
              <button
                onClick={() => setShowAsidenav(val => !val)}>
                ➥
              </button>
              }

            {
              menuOptions.map(text => 
                <button
                  className={`${text}` === page? 'active' : ''}
                  onClick={() => setPage(text)}
                >
                  {text}
                </button>

              )
            }
            <div className='flex col stats-section'>
              <h4 className='flex center'>
                Dinero:
              </h4>
              <span>Creditos: {playerStats.money}</span>
              <span>Platinos: {playerStats.platimun}</span>
            </div>

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
        <section className='w100'>
          {
            showPage()
          }
        </section>
      </main>:
        <LoginPage
          handleLogin={(val: boolean) => setIsLogin(val)}
        />
      }

      
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