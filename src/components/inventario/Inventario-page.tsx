import { useState } from "react"
import SlotInvetario from "./slot-inventario-component"
import cocina from "../../assets/icons/cocina.png"
import { ARMORY } from "../initialData/armory.init"
import type { Weapon } from "../models/items-fight.interfaces"
import type { EquipmentUser, PlayerStatsControl } from "../models/player.interfaces"

function InventarioPage(
  props: {
    playerStats: PlayerStatsControl,
    setEquipment: Function
  }
) {
  const [slot, setSlot] = useState<string | null>(null)
  const [slotInvetory, setSlotInvetory] = useState<string | null>(null)

  const [inventario, setInventario] = useState<EquipmentUser>(props.playerStats.equipment)

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
    {
      id: 2,
      cantidad: 1,
    },
  ]

  const biblioteca: Record<number, Weapon> = ARMORY;

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
    setSlot((val:string | null) => val !== id? id: null)
  }

  function handleSetSlotInvetory(ids: string){
    setSlotInvetory((val:string | null) => val !== ids? ids: null)

    if(slot !== null){
      const id: number = Number(ids)
      console.log(id)
      if(['inv-arma','inv-armadura','inv-shield'].includes(slot)){
        if(slot === 'inv-arma' && biblioteca[id]?.type === 'weapon'){
          setInventario((val) => {
            const final: EquipmentUser = {
              ...val,
              idWeapon: biblioteca[id].id
            }

            return final
          }) 
          props.setEquipment((val: PlayerStatsControl) => {
            const finalStatus:PlayerStatsControl = {
              ...val,
              bonos:{
                ...val.bonos,
                attack: biblioteca[id].damage
              },
              equipment:{
                ...val.equipment,
                idWeapon: biblioteca[id].id
              }
            }

            return finalStatus;
          })
          clean();
        }else if(slot === 'inv-armadura' && biblioteca[id]?.type === 'armor'){
          setInventario((val) => {
            const final: EquipmentUser = {
              ...val,
              idArmor: biblioteca[id].id
            }

            return final
          }) 

          props.setEquipment((val: PlayerStatsControl) => {
            const finalStatus: PlayerStatsControl = {
              ...val,
              bonos:{
                ...val.bonos,
                defense: biblioteca[id].defense
              },
              equipment:{
                ...val.equipment,
                idArmor: biblioteca[id].id
              }
            }

            return finalStatus;
          })

          clean();
        }else if(slot === 'inv-shield' && biblioteca[id]?.type === 'shield'){
          clean();
        }
      }
    }
  }

  function clean(){
    setSlot(null);
    setSlotInvetory(null);
  }

  return (
    <>
      <section 
        style={{maxWidth: '30rem'}}
        className="flex col background-texto pad-05">
        <div>
          <h3>Equipo Personaje</h3>
            {
              Object.entries(inventario).map(([key, value]) => <div key={key}>
                  <span>{key}: {value}</span>
                </div>)
            }
            <section className="flex">
              <SlotInvetario
                id="inv-arma"
                slotSlected={slot}
                icon={biblioteca[inventario?.idWeapon || 0]?.icon}
                selected={(val:string) => handleSetSlot(val)}
                cant={null}
              />
              <SlotInvetario
                id="inv-armadura"
                slotSlected={slot}
                icon={biblioteca[inventario?.idArmor || 0].icon || null}
                selected={(val:string) => handleSetSlot(val)}
                cant={null}
              />

              <SlotInvetario
                id="inv-shield"
                slotSlected={slot}
                icon={biblioteca[inventario?.idShield || 0].icon || null}
                selected={(val:string) => handleSetSlot(val)}
                cant={null}
              />
              <div className="tooltip-info flex col pad-05">
                <span>
                  Nombre:
                </span>
                <span>
                  Descripcion:
                </span>
                <span>
                  Usos:
                </span>
              </div>
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
                    key={index}
                    id={`habitacion-${index}`}
                    slotSlected={slot}
                    icon={bibliotecaNave[val].icon || null}
                    selected={(val:string) => handleSetSlot(val)}
                    cant={null}
                  />
                )
                }
              </section>
            </div>
              
            
          <h3>Inventario</h3>
           <section className="flex wrap">
            {
            ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19'].map((val) => 
                <SlotInvetario
                  key={val}
                  id={val}
                  slotSlected={slotInvetory}
                  icon={biblioteca[inventarioReal[Number(val)]?.id]?.icon}
                  selected={(val:string) => handleSetSlotInvetory(val)}
                  cant={inventarioReal[Number(val)]?.cantidad}
                />
              )
            }
            </section>
        </div>

      </section>
    </>
  )
}

export default InventarioPage