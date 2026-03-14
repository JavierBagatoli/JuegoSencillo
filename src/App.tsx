import { useState } from 'react'
import './index.css'
import Dungeon from './components/Dungeon'
import ToolTipAtributo from './components/ToolTipAtributo'
import ComercioPage from './components/comercio/Comercio-page'
import { ToastContainer, toast } from 'react-toastify';
import InventarioPage from './components/inventario/Inventario-page'
import MapaGlobal from './components/mapa/Mapa-page'
function App() {
  const [page, setPage] = useState<'crear' | 'mapa' | 'dungeon' | 'comercio' | 'inventario' | 'trabajar'>('mapa')
  const [mochila, setMochila] = useState<Mochila>({
    circuito: 0,
    metales: 0,
    cristales: 0,
    nucleosEnergeticos: 0
  })

  const notify = () => toast('Wow so easy !');

  const showPage = () => {
    switch(page){
      case 'mapa':
        return <MapaGlobal/>
      case 'dungeon':
        return <Dungeon 
          mochilla={mochila}
          updateMochila={setMochila}/>
      case 'comercio':
        return <ComercioPage
            mochila={mochila}
            updateMochila={setMochila}
          />
      case 'inventario':
        return <InventarioPage/>
    }
  }

  return (
    <>
      <main>
        <aside className='menu-acciones'>
          <button
            onClick={() => setPage('mapa')}
          >
            Mapa
          </button>
          <button
            onClick={() => setPage('trabajar')}
          >
            Trabajar
          </button>
          <button
            onClick={() => setPage('crear')}
          >
            Crear
          </button>
          <button
            onClick={() => setPage('comercio')}
          >
            Comerciar
          </button>
          <button
            onClick={() => setPage('dungeon')}
            >
            Dungeon
          </button>
          <button
            onClick={() => setPage('inventario')}
            >
            Inventario
          </button>
          <div className='flex col'>
            <span className='flex center'>Pociones:</span>
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
          <div>
            <span className='flex center'>Recusos</span>
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
          </div>
        </aside>
        <section className='pad-1'>
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