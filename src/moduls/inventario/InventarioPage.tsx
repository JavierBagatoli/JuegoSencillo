import { useEffect, useState } from "react"
import SlotInvetario from "./SlotInventario"
import "./InventarioPage.css"
import type { EquipmentUser, PlayerStatsControl } from "../../components/models/player.interfaces"
import { ARMORY } from "../../components/initialData/armory.init"
import type { Weapon } from "../../components/models/items-fight.interfaces"
import { useInventory } from "../../hooks/useInventoryContext"


function InventarioPage(
  props: {
    playerStats: PlayerStatsControl,
    setEquipment: Function,
    /*invetory: InvetoryPlayer[]*/
  }
) {
  const inventory = useInventory();

  useEffect(() => {
    inventory.getEquipment(props.playerStats.id);
    inventory.getInventory(props.playerStats.id)
  }, [])
  
  const [slot, setSlot] = useState<string | null>(null)
  const [slotInventory, setSlotInvetory] = useState<string | null>(null)
  const [idShowInfo, setIdShowInfo] = useState<number>(0)
  const [typeItem, setTypeItem] = useState<string | null>(null)
 
  const biblioteca: Record<number, Weapon> = ARMORY;

  function handleSetSlot(id: string){
    setSlot((val:string | null) => val !== id? id: null)

    switch(id){
      case 'inv-weapon':
        setIdShowInfo(props.playerStats.equipment.idWeapon || 999);
        setTypeItem(_val => 'weapon')
        break;
      case 'inv-armor':
        setIdShowInfo(props.playerStats.equipment.idArmor || 999);
        setTypeItem(_val => 'armor')
        break;
      case 'inv-shield':
        setIdShowInfo(props.playerStats.equipment.idShield || 999);
        setTypeItem(_val => 'shield')
        break;
      case 'habitacion-0':
        setIdShowInfo(props.playerStats.room.r0);
        setTypeItem(_val => 'room')
        break;
      case 'habitacion-1':
        setIdShowInfo(props.playerStats.room.r1);
        setTypeItem(_val => 'room')
        break;
      case 'habitacion-2':
        setIdShowInfo(props.playerStats.room.r2);
        setTypeItem(_val => 'room')
        break;
      case 'habitacion-3':
        setIdShowInfo(props.playerStats.room.r3);
        setTypeItem(_val => 'room')
        break;
      case 'habitacion-4':
        setIdShowInfo(props.playerStats.room.r4);
        setTypeItem(_val => 'room')
        break;
    }

  }

  const typesOfSlots: string[] = ['inv-weapon','inv-armor','inv-shield','habitacion-0','habitacion-1','habitacion-2','habitacion-3','habitacion-4'];

  function handleSetSlotInventory2(id: number){
    setSlotInvetory((val:string | null) => val !== `${id}`? `${id}`: '999')

    if(!typesOfSlots.includes(slot || '')){ return }
    const i: number = Number(id)
    const idItemSelected = biblioteca[inventory.inventory[i].id]
    
    let idW: number = props.playerStats.equipment.idWeapon?? 999;
    let idA: number = props.playerStats.equipment.idArmor?? 1000;
    let idS: number = props.playerStats.equipment.idShield?? 1001;
    let idR0: number = props.playerStats.room.r0?? 999;
    let idR1: number = props.playerStats.room.r1?? 999;
    let idR2: number = props.playerStats.room.r2?? 999;
    let idR3: number = props.playerStats.room.r3?? 999;
    let idR4: number = props.playerStats.room.r4?? 999;
      

    if(typeof idItemSelected === 'undefined'){ return }
    if(slot === null) return

      if(slot === 'inv-weapon' && idItemSelected.type === 'weapon'){
        idW = idItemSelected.id
      }else if(slot === 'inv-armor' && idItemSelected.type === 'armor'){
        idA = idItemSelected.id 
      }else if(slot === 'inv-shield'   && idItemSelected.type === 'shield'){
        idS = idItemSelected.id
      }else if(slot?.startsWith('habitacion') && idItemSelected.type.startsWith('room')){
        const endWith: string = slot.charAt(slot.length - 1);
        if(endWith === '0'){
          idR0 = idItemSelected.id
        }else if(endWith === '1'){
          idR1 = idItemSelected.id
        }else if(endWith === '2'){
          idR2 = idItemSelected.id
        }else if(endWith === '3'){
          idR3 = idItemSelected.id
        }else if(endWith === '4'){
          idR4 = idItemSelected.id
        }
      }

      inventory.getSetEquipment({
        idUser: props.playerStats.id,
        idSlot: slot,
        playerIdinventory: idItemSelected.id
      })
      
      const final: EquipmentUser = {
        idWeapon: idW,
        idShield: idS,
        idArmor:  idA,
      }

      const actions: number = (biblioteca[idW].actions || 1) 
        + (biblioteca[idA].actions || 0)
        + (biblioteca[idS].actions || 0)

        
      props.setEquipment((val: PlayerStatsControl) => {

        const finalStatus:PlayerStatsControl = {
          ...val,
          bonos:{
            ...val.bonos,
            attack: biblioteca[idW]?.damage || 0 +
              biblioteca[idA]?.damage || 0  +
              biblioteca[idS]?.damage || 0, 
            actions: actions
          },
          equipment: final,
          room:{
            r0: idR0 || 0,
            r1: idR1 || 0,
            r2: idR2 || 0,
            r3: idR3 || 0,
            r4: idR4 || 0,
          }
        }

        return finalStatus;
      })
    
  }

  const selectIcon = (typeIcon: 'armor' | 'weapon' | 'shield' | 'r0' | 'r1' | 'r2' | 'r3' | 'r4') => {
    let selectId: number | null = null
    const playerData = props.playerStats.equipment;

    if (typeIcon === 'armor'){
      if(playerData.idArmor !== 999){
        selectId = playerData.idArmor
      }
    }else if (typeIcon === 'shield'){
      if(playerData.idShield !== 999){
        selectId = playerData.idShield
      }
    }else if (typeIcon === 'weapon'){
      if(playerData.idWeapon !== 999){
        selectId = playerData.idWeapon
      }
    }else if (typeIcon.startsWith('r')){
      if(props.playerStats.room[typeIcon]){
        selectId = props.playerStats.room[typeIcon]
      }
    }

    return selectId !== null? biblioteca[selectId].icon ?? null : null
  }

  const TotalDamagePlayer = () => {
    const playerData = props.playerStats.equipment;

    return ARMORY[props.playerStats.baseAttack].damage
         + ARMORY[playerData.idArmor?? 999].damage
         + ARMORY[playerData.idShield?? 1001].damage
         + ARMORY[playerData.idWeapon?? 1000].damage
  }

  const TotalDefensePlayer = () => {
    const playerData = props.playerStats.equipment;

    return ARMORY[props.playerStats.baseAttack].defense
      + ARMORY[playerData.idArmor?? 999].defense
      + ARMORY[playerData.idShield?? 1001].defense
      + ARMORY[playerData.idWeapon?? 1000].defense
  }

  const TotalActionsPlayer = () => {
    return props.playerStats.actionsMax + props.playerStats.bonos.actions
  }

  return (
    <>
      <section 
        className="background-inventario pad-05 max-h">
          <h3 className="text-center">Equipo de Personaje</h3>
        <div className="flex col gap-15">
          <div className="flex">
            <div className="flex center">

            <div
              className="flex col tooltip-player-stats">
              <span>
                Daño: {TotalDamagePlayer()}
              </span>
              <span>
                Defensa: {TotalDefensePlayer()}
              </span>
              <span>
                Acciones: {TotalActionsPlayer()}
              </span>
            </div>

          <section className="flex">
            <SlotInvetario
              id="inv-weapon"
              slotSlected={slot}
              icon={selectIcon("weapon")}
              selected={(val:string) => handleSetSlot(val)}
              cant={null}
              />
            <SlotInvetario
              id="inv-armor"
              slotSlected={slot}
              icon={selectIcon("armor")}
              selected={(val:string) => handleSetSlot(val)}
              cant={null}
            />

            <SlotInvetario
              id="inv-shield"
              slotSlected={slot}
              icon={selectIcon("shield")}
              selected={(val:string) => handleSetSlot(val)}
              cant={null}
            />
          </section>
            </div>
            <div className="tooltip-info flex col pad-05">
              <span>
                <b>Nombre:</b> {biblioteca[idShowInfo]?.nombre}
              </span>
              <span>
                Descripcion: {biblioteca[idShowInfo]?.descripcion}
              </span>
              <span>
                Usos: {biblioteca[idShowInfo]?.uses}
              </span>
            </div>
          </div>



          <h3>Equipo Nave Espacial</h3>
          <div className="flex col">
            <div className="flex col tooltip-info">
              <span>
                Daño: {
                    ARMORY[props.playerStats.room.r0 || 999].damage
                  + ARMORY[props.playerStats.room.r1 || 999].damage
                  + ARMORY[props.playerStats.room.r2 || 999].damage
                  + ARMORY[props.playerStats.room.r3 || 999].damage
                  + ARMORY[props.playerStats.room.r4 || 999].damage
                  }
            </span>
            <span>
              Defensa: {
                  ARMORY[props.playerStats.room.r0 || 999].defense
                + ARMORY[props.playerStats.room.r1 || 999].defense
                + ARMORY[props.playerStats.room.r2 || 999].defense
                + ARMORY[props.playerStats.room.r3 || 999].defense
                + ARMORY[props.playerStats.room.r4 || 999].defense
                }
            </span>
            </div>
          
            <section className="flex">
              {[props.playerStats.room.r0,
                props.playerStats.room.r1,
                props.playerStats.room.r2,
                props.playerStats.room.r3,
                props.playerStats.room.r4,
              ].map((_val, index) => <SlotInvetario
                  key={index}
                  id={`habitacion-${index}`}
                  slotSlected={slot}
                  icon={selectIcon(`r${index as 0 | 1 | 2 | 3 | 4}`)}
                  selected={(val:string) => handleSetSlot(val)}
                  cant={null}
                  />
              )
              }
            </section>
          </div>
              
            
          <h3 style={{paddingTop: '0.5rem'}}>Inventario</h3>
          <section className="flex wrap">
          {
          inventory.inventory.map((val,index) => 
              <div key={index}>
                <SlotInvetario
                  id={`item-inventory-${index}`}
                  slotSlected={slotInventory}
                  unselected={biblioteca[val.id]?.type.split('_')[0] === typeItem || typeItem === null}
                  icon={biblioteca[val.id]?.icon}
                  selected={(_val:string) => handleSetSlotInventory2(index)}
                  cant={val.cantidad}
                />
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