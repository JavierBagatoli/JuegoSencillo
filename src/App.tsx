import { useState } from 'react'
import './index.css'
import Dungeon from './components/Dungeon'
import ToolTipAtributo from './components/ToolTipAtributo'
import ComercioPage from './components/comercio/Comercio-page'
import { ToastContainer, toast } from 'react-toastify';
function App() {
  const [count, setCount] = useState(0)
  const [mochila, setMochila] = useState<Mochila>({
    circuito: 0,
    metales: 0,
    cristales: 0,
    nucleosEnergeticos: 0
  })

  const notify = () => toast('Wow so easy !');

  return (
    <>
      <main>
      <ToastContainer
        aria-label={''}
      />
        <button
          onClick={notify}
        >clicl</button>
        <aside className='menu-acciones'>
          <button>
            Trabajar
          </button>
          <button>
            Comerciar
          </button>
          <button>
            Minar
          </button>
          <button>
            Dungeon
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
        <section>
          <Dungeon 
            mochilla={mochila}
            updateMochila={setMochila}/>
        </section>
        <section style={{marginTop:'2rem'}}>
          <ComercioPage
            mochila={mochila}
            updateMochila={setMochila}
          />
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