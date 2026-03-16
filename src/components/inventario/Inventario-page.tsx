import { useState } from "react"
import escopeta from "../../assets/icons/escopeta.png"
import armadura from "../../assets/icons/armadura.png"
import SlotInvetario from "./slot-inventario-component"
import cocina from "../../assets/icons/cocina.png"

function InventarioPage() {
  const [slot, setSlot] = useState<string | null>(null)
  const [slotInvetory, setSlotInvetory] = useState<number | null>(null)

  const [inventario, setInventario] = useState<{
    arma: number,
    armadura: number,
  }>({
    arma: 999,
    armadura: 999,
  })

  const naveEspacio = {
    vida: 0,
    damage: 0,
    habitacion1: 0,
    habitacion2: 0,
    habitacion3: 0,
    habitacion4: 0,
    habitacion5: 0,
  }

  const inventarioReal: {id: number, cantidad: number}[] =[
    {
      id: 0,
      cantidad: 2,
    },
    {
      id: 1,
      cantidad: 2,
    },
  ]

  const biblioteca: Record<number, {
    nombre: string,
    descripcion: string,
    id: number,
    type: 'weapon' | 'armor',
    icon: any
  }> = {
    999: {
      nombre: 'Puños',
      descripcion: '',
      id: 0,
      type: 'weapon',
      icon: null
    },
    0: {
      nombre: 'Escopeta',
      descripcion: 'Arma antigua',
      id: 0,
      type: 'weapon',
      icon: escopeta
    },
    1: {
      nombre: 'Armadura',
      descripcion: 'Armadura antigua',
      id: 1,
      type: 'armor',
      icon: armadura
    },
    2: {
      nombre: 'Escopeta',
      descripcion: 'Arma antigua',
      id: 2,
      type: 'weapon',
      icon: ''
    },
    3: {
      nombre: 'Escopeta',
      descripcion: 'Arma antigua',
      id: 3,
      type: 'weapon',
      icon: ''
    },
  }

  const bibliotecaNave: Record<number, {
    id: number,
    icon: any
  }> = {
    0:{
      id:0,
      icon: cocina
    }
  }

  function handleSetSlot(id: string){
    setSlot(id)
  }

  function handleSetSlotInvetory(id: number){
    setSlotInvetory(id)

    if(slot !== null){
      if(slot === 'inv-arma'){
        setInventario((val) => {
          return {
            ...val,
            arma:biblioteca[id].id
          }
        }) 

        setSlot(null)
        setSlotInvetory(null)
      }
      
    }
  }

  return (
    <>
      <section 
        style={{maxWidth: '30rem'}}
        className="flex col background-texto pad-05">
        <div>
          <h3>Equipo Personaje</h3>
            {
              Object.entries(inventario).map(([key, value]) => <div>
                  <span>{key}: {value}</span>
                </div>)
            }
            <section className="flex">
            <SlotInvetario
              id="inv-arma"
              slotSlected={slot}
              icon={biblioteca[inventario.arma].icon || null}
              selected={(val:string) => handleSetSlot(val)}
            />
            <SlotInvetario
              id="inv-armadura"
              slotSlected={slot}
              icon={biblioteca[inventario.armadura].icon || null}
              selected={(val:string) => handleSetSlot(val)}
            />

            </section>

          <h3>Equipo Nave Espacial</h3>
            <div className="flex col">
              <span>Vida: {naveEspacio.vida}</span>
              <span>Daño: {naveEspacio.damage}</span>
            
              <section className="flex">
                {[naveEspacio.habitacion1,
                  naveEspacio.habitacion2,
                  naveEspacio.habitacion3,
                  naveEspacio.habitacion4,
                  naveEspacio.habitacion5,
                ].map((val, index) => 
                  <SlotInvetario
                    id={`habitacion-${index}`}
                    slotSlected={slot}
                    icon={bibliotecaNave[val].icon || null}
                    selected={(val:string) => handleSetSlot(val)}
                  />
                )
                }
              </section>
            </div>
              
            
          <h3>Inventario</h3>
           <section className="flex wrap">
            {
            /*[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((val) =>
              <SlotInvetario
                id={`inv-${val}`}
                slotSlected={slot}
                icon={''}
                selected={(val:string) => handleSetSlotInvetory(val)}
              />)*/
            }
            {
              [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19].map((val) => 
                <div
                  onClick={() => handleSetSlotInvetory(val)}
                  className="slot-item">
                  <span>{biblioteca[inventarioReal[val]?.id]?.nombre}: {inventarioReal[val]?.cantidad}  </span>
                </div>
              )
            }

            </section>
        </div>

      </section>
    </>
  )
}

export default InventarioPage