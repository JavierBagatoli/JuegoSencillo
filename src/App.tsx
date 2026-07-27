import { useEffect, useState } from 'react'
import './index.css'
import { PLAYER_INITIAL_DUNGEON } from './components/initialData/player.init'
import type { InvetoryPlayer, PlayerStatsControl } from './components/models/player.interfaces'
import MapaGlobalPage from './features/mapa/MapaMundoPage'
import ComercioPage from './features/comercio/ComercioPage'
import InventarioPage from './features/inventario/InventarioPage'
import ToolTipAtributo from './components/ToolTipAtributo'
import type { MenuOptions } from './components/models/menu.interfaces'
import ConfigPerfilPage from './features/perfil/PerfilPage'
import BatallaInvasionPage from './features/invasion-battle/BatallaInvasionPage'
import TrabajoPage from './features/trabajo/components/TrabajoPage'
import CrearPage from './features/craft/CrearPage'
import { INVENTARY } from './components/initialData/inventary.init'
import LoginPage from './features/login/components/LoginPage'
import { loginWithGoogle, logout, useAuth } from './hooks/useAuth'
import { CarftProvider } from './features/craft/hooks/useCraftContext'
import { DungeonProvider } from './features/dungeon/hooks/useDungeonContext'
import DungeonPage from './features/dungeon/components/DungeonPage'
import { InventoryProvider } from './features/inventario/hooks/useInventoryContext'
import { usePlayer } from './features/player/hooks/usePlayerContext'
import { ProfileProvider } from './features/perfil/hooks/useProfileContext'

function App() {
  const { user } = useAuth();
  const { player } = usePlayer();

  const [page, setPage] = useState<MenuOptions>('mapa')
  const [playerStats, setPlayerStats] = useState<PlayerStatsControl>(PLAYER_INITIAL_DUNGEON)
  const [showAsidenav, setShowAsidenav] = useState<boolean>(false)
  const [invetory, setInventory] = useState<InvetoryPlayer[]>(INVENTARY)
  const isMobile: boolean =window.innerWidth < 720

  useEffect(() => {//Not Work
    if(player.name === "No Name"){
      setPage("Perfil")
    }
  }, [player.name])

  const menuOptions: MenuOptions[] = ['mapa',
    // 'trabajar', 
    'crear',// 'comercio',
    'dungeon',// 'invasion',
    'inventario', 
    'Perfil'
    ]

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
      case 'Perfil':
        return <ProfileProvider>
          <ConfigPerfilPage/>
        </ProfileProvider>
      case 'mapa':
        return <MapaGlobalPage/>
      case 'crear':
        return <CarftProvider>
          <CrearPage
            invetory={invetory}
            updateInventario={setInventory}
            />
        </CarftProvider>
      case 'dungeon':
        return <DungeonProvider>
          <DungeonPage
            playerStats={playerStats}
            />
        </DungeonProvider>
      case 'invasion':
        return <BatallaInvasionPage/>
      case 'comercio':
        return <ComercioPage/>
      case 'inventario':
        return <InventoryProvider>
            <InventarioPage
              playerStats={playerStats}
              setEquipment={setPlayerStats}
            />
        </InventoryProvider>
        
    }
  }

  const handleLogin = async (use: "login" | "logout") => {
    if(use === "login"){
      loginWithGoogle()
    }else{
      logout()
    }
  }
  
  return (
    <>      
      {
        user?<main className={`principal-view ${isMobile?'':'desktop'}`}>
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
              menuOptions.map((text, index) => 
                <button
                  key={index}
                  className={`${text}` === page? 'active' : ''}
                  onClick={() => setPage(text)}
                >
                  {text}
                </button>
              )
            }
            <button
              style={{zIndex: 1}}
              onClick={() => handleLogin("logout")}>
              Cerrar Sesión
            </button>
            <div className='flex col stats-section'>
              <h4 className='flex center'>
                Dinero:
              </h4>
              <span>Creditos: {player?.wallet?.credits ?? 0}</span>
              <span>Platinos: {player?.wallet?.platino ?? 0}</span>
            </div>

            {false && <div className='flex col stats-section'>
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
            }
            

            <div className='flex col stats-section'>
              <h4 className='flex center'>Recusos</h4>
              <ToolTipAtributo
                text='Circuitos'
                actualValue={player.resources.circuits}
                maxValue={999}
              />
              <ToolTipAtributo
                text='Nucleos'
                actualValue={player.resources.cores}
                maxValue={999}
              />
              <ToolTipAtributo
                text='Metales'
                actualValue={player.resources.metals}
                maxValue={999}
              />
              <ToolTipAtributo
                text='Cristales'
                actualValue={player.resources.crystals}
                maxValue={999}
              />              
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
          loginWithGoogle={() => handleLogin("login")}
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