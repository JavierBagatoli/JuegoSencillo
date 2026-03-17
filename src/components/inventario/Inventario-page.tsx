import { useState } from "react"
import SlotInvetario from "./slot-inventario-component"
import { ARMORY } from "../initialData/armory.init"
import type { Weapon } from "../models/items-fight.interfaces"
import type { EquipmentShipUser, EquipmentUser, PlayerStatsControl } from "../models/player.interfaces"

function InventarioPage(
  props: {
    playerStats: PlayerStatsControl,
    setEquipment: Function
  }
) {
  const [slot, setSlot] = useState<string | null>(null)
  const [slotInvetory, setSlotInvetory] = useState<string | null>(null)
  const [idShowInfo, setIdShowInfo] = useState<number>(0)
  const [roomsShips, setRoomsShips] = useState<EquipmentShipUser>({
    r1: 0,
    r2: 0,
    r3: 0,
    r4: 0,
    r5: 0,
  })
 
  const [inventario, setInventario] = useState<EquipmentUser>(props.playerStats.equipment)

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
    {
      id: 100001,
      cantidad: 1,
    },{
      id: 100004,
      cantidad: 1,
    },{
      id: 100015,
      cantidad: 1,
    },
  ]

  const biblioteca: Record<number, Weapon> = ARMORY;

  function handleSetSlot(id: string){
    setSlot((val:string | null) => val !== id? id: null)

    switch(id){
      case 'inv-arma':
        setIdShowInfo(props.playerStats.equipment.idWeapon || 0);
        break;
      case 'inv-armadura':
        setIdShowInfo(props.playerStats.equipment.idArmor || 0);
        break;
      case 'inv-shield':
        setIdShowInfo(props.playerStats.equipment.idShield || 0);
        break;
      case 'habitacion-1':
        setIdShowInfo(props.playerStats.room?.r1 || 0);
        break;
      case 'habitacion-2':
        setIdShowInfo(props.playerStats.room?.r2 || 0);
        break;
      case 'habitacion-3':
        setIdShowInfo(props.playerStats.room?.r3 || 0);
        break;
      case 'habitacion-4':
        setIdShowInfo(props.playerStats.room?.r4 || 0);
        break;
      case 'habitacion-5':
        setIdShowInfo(props.playerStats.room?.r5 || 0);
        break;
    }
  }

  function handleSetSlotInvetory(ids: string){
    setSlotInvetory((val:string | null) => val !== ids? ids: null)

    if(slot !== null){
      const id: number = Number(ids)
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
          
          setInventario((val) => {
            const final: EquipmentUser = {
              ...val,
              idShield: biblioteca[id].id
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
                idShield: biblioteca[id].id
              }
            }

            return finalStatus;
          })
          clean();
        }
      }

      let roomsFinal: EquipmentShipUser = {
        r1: 0, 
        r2: 0,
        r3: 0,
        r4: 0,
        r5: 0,
      }

      if(['habitacion-0',
        'habitacion-1',
        'habitacion-2',
        'habitacion-3',
        'habitacion-4'].includes(slot)){ 
          
        setRoomsShips((val) => {
  
          const r01: number = slot === 'habitacion-0'? biblioteca[inventarioReal[id].id].id : val.r1
          const r02: number = slot === 'habitacion-1'? biblioteca[inventarioReal[id].id].id : val.r2
          const r03: number = slot === 'habitacion-2'? biblioteca[inventarioReal[id].id].id : val.r3
          const r04: number = slot === 'habitacion-3'? biblioteca[inventarioReal[id].id].id : val.r4
          const r05: number = slot === 'habitacion-4'? biblioteca[inventarioReal[id].id].id : val.r5
          
          roomsFinal = {
            ...val,
            r1: r01, 
            r2: r02,
            r3: r03,
            r4: r04,
            r5: r05,
          }
          
          return roomsFinal;
        }) 
          
        props.setEquipment((val: PlayerStatsControl) => {
          const finalStatus:PlayerStatsControl = {
            ...val,
            room: roomsFinal
          }

          return finalStatus;
        })
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
                  Nombre: {biblioteca[idShowInfo].nombre}
                </span>
                <span>
                  Descripcion: {biblioteca[idShowInfo].descripcion}
                </span>
                <span>
                  Usos: {biblioteca[idShowInfo].uses}
                </span>
              </div>
            </section>

          <h3>Equipo Nave Espacial</h3>
            <div className="flex col">
              <span>Vida: ??</span>
              <span>Daño: ??</span>
            
              <section className="flex">
                {[roomsShips.r1,
                  roomsShips.r2,
                  roomsShips.r3,
                  roomsShips.r4,
                  roomsShips.r5,
                ].map((val, index) => <SlotInvetario
                    key={index}
                    id={`habitacion-${index}`}
                    slotSlected={slot}
                    icon={biblioteca[val].icon || null}
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