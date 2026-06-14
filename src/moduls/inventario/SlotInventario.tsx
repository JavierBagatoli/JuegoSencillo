import shield from '../../assets/icons/shield.png'
import armor from '../../assets/icons/armadura.png'
import sword from '../../assets/icons/sword.png'
import shipModule from '../../assets/icons/room_speed/speed1.png'


function SlotInvetario(
  props: {
    id: string,
    slotSlected: string | null
    icon: string | null,
    selected: Function,
    cant: number | null
    unselected?: boolean,
  }
) {
  const showImageBase = ():any =>{
    if(props.id === 'inv-arma'){
      return sword
    }else if(props.id === 'inv-armadura'){
      return armor
    }else if(props.id === 'inv-shield'){
      return shield
    }else{
      return shipModule
    }
  }

  return (
    <>
       <div
          onClick={() => props.selected(props.id)}
          className={`${props.slotSlected === props.id? 'slot-item-selected' : ''} slot-item`}>
            {props?.icon ?
              <img
                className={!props.unselected && typeof props.unselected !== 'undefined'? 'unselected':''}
                src={props?.icon}/>
              :
              <div></div>
            }
            <div>
              {!props.icon &&
                  <img
                  className='unselected'
                  src={showImageBase()}/>
              }
              <span className={(props.cant || 0) > 0? 'tooltip-count': ''}>{props.cant || ''}</span>
            </div>
        </div>

  </>)}

export default SlotInvetario