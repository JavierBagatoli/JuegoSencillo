import { useState } from "react"
import SlotInvetario from "./SlotInventario"
import "./InventarioPage.css"
import type { EquipmentUser, PlayerStatsControl } from "../../components/models/player.interfaces"
import { INVENTARY } from "../../components/initialData/inventary.init"
import { ARMORY } from "../../components/initialData/armory.init"
import type { Weapon } from "../../components/models/items-fight.interfaces"


function InventarioPage(
  props: {
    playerStats: PlayerStatsControl,
    setEquipment: Function
  }
) {
  const [slot, setSlot] = useState<string | null>(null)
  const [slotInventory, setSlotInvetory] = useState<string | null>(null)
  const [idShowInfo, setIdShowInfo] = useState<number>(0)
  const [typeItem, setTypeItem] = useState<string | null>(null)
 
  const inventarioReal: {id: number, cantidad: number}[] = INVENTARY;
  const biblioteca: Record<number, Weapon> = ARMORY;

  function handleSetSlot(id: string){
    setSlot((val:string | null) => val !== id? id: null)

    switch(id){
      case 'inv-arma':
        setIdShowInfo(props.playerStats.equipment.idWeapon || 0);
        setTypeItem(_val => 'weapon')
        break;
      case 'inv-armadura':
        setIdShowInfo(props.playerStats.equipment.idArmor || 0);
        setTypeItem(_val => 'armor')
        break;
      case 'inv-shield':
        setIdShowInfo(props.playerStats.equipment.idShield || 0);
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

  const typesOfSlots: string[] = ['inv-arma','inv-armadura','inv-shield','habitacion-0','habitacion-1','habitacion-2','habitacion-3','habitacion-4'];

  function handleSetSlotInventory2(id: string){
    setSlotInvetory((val:string | null) => val !== id? id: null)

    if(!typesOfSlots.includes(slot || '')){ return }
    const i: number = Number(id)
    const idItemSelected = biblioteca[inventarioReal[i]?.id]
    
      let idW: number = props.playerStats.equipment.idWeapon || 999;
      let idA: number = props.playerStats.equipment.idArmor || 999;
      let idS: number = props.playerStats.equipment.idShield || 999;
      let idR0: number = props.playerStats.room.r0 || 0;
      let idR1: number = props.playerStats.room.r1 || 0;
      let idR2: number = props.playerStats.room.r2 || 0;
      let idR3: number = props.playerStats.room.r3 || 0;
      let idR4: number = props.playerStats.room.r4 || 0;
      

    if(typeof idItemSelected === 'undefined'){ return }
      if(slot === 'inv-arma' && idItemSelected.type === 'weapon'){
        idW = idItemSelected.id
      }else if(slot === 'inv-armadura' && idItemSelected.type === 'armor'){
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

    if (typeIcon === 'armor'){
      if(props.playerStats.equipment?.idArmor){
        selectId = props.playerStats.equipment?.idArmor
      }
    }else if (typeIcon === 'shield'){
      if(props.playerStats.equipment?.idShield){
        selectId = props.playerStats.equipment?.idShield
      }
    }else if (typeIcon === 'weapon'){
      if(props.playerStats.equipment?.idWeapon){
        selectId = props.playerStats.equipment?.idWeapon
      }
    }else if (typeIcon.startsWith('r')){
      if(props.playerStats.room[typeIcon]){
        selectId = props.playerStats.room[typeIcon]
      }
    }

    return selectId !== null? biblioteca[selectId].icon ?? null : null
  }

  const TotalDamagePlayer = () => {
    return ARMORY[props.playerStats.baseAttack].damage
            + ARMORY[props.playerStats.equipment.idArmor || 0].damage
            + ARMORY[props.playerStats.equipment.idShield || 0].damage
            + ARMORY[props.playerStats.equipment.idWeapon || 0].damage
  }

  const TotalDefensePlayer = () => {
    return ARMORY[props.playerStats.baseAttack].defense
      + ARMORY[props.playerStats.equipment.idArmor || 0].defense
      + ARMORY[props.playerStats.equipment.idShield || 0].defense
      + ARMORY[props.playerStats.equipment.idWeapon || 0].defense
  }

  const TotalActionsPlayer = () => {
    return props.playerStats.actionsMax + props.playerStats.bonos.actions
  }

  return (
    <>
      <section 
        style={{maxWidth: '30rem'}}
        className="flex col background-inventario pad-05 max-h">
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
              id="inv-arma"
              slotSlected={slot}
              icon={selectIcon("weapon")}
              selected={(val:string) => handleSetSlot(val)}
              cant={null}
              />
            <SlotInvetario
              id="inv-armadura"
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
                  ARMORY[props.playerStats.room.r0 || 0].damage
                  + ARMORY[props.playerStats.room.r1 || 0].damage
                  + ARMORY[props.playerStats.room.r2 || 0].damage
                  + ARMORY[props.playerStats.room.r3 || 0].damage
                  + ARMORY[props.playerStats.room.r4 || 0].damage
                  }
            </span>
            <span>
              Defensa: {
                ARMORY[props.playerStats.room.r0 || 0].defense
                + ARMORY[props.playerStats.room.r1 || 0].defense
                + ARMORY[props.playerStats.room.r2 || 0].defense
                + ARMORY[props.playerStats.room.r3 || 0].defense
                + ARMORY[props.playerStats.room.r4 || 0].defense
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
          ['0','1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19'].map((val) => 
              <div>
                <SlotInvetario
                  key={val}
                  id={val}
                  slotSlected={slotInventory}
                  unselected={biblioteca[inventarioReal[Number(val)]?.id]?.type.split('_')[0] === typeItem || typeItem === null}
                  icon={biblioteca[inventarioReal[Number(val)]?.id]?.icon}
                  selected={(val:string) => handleSetSlotInventory2(val)}
                  cant={inventarioReal[Number(val)]?.cantidad}
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