import shield from '../../assets/icons/shield.png'
import armor from '../../assets/icons/armadura.png'
import sword from '../../assets/icons/sword.png'

function SlotInvetario(
  props: {
    id: string,
    slotSlected: string | null
    icon: string,
    selected: Function,
    cant: number | null
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
      return shield
    }
  }

  return (
    <>
       <div
          onClick={() => props.selected(props.id)}
          className={`${props.slotSlected === props.id? 'slot-item-selected' : ''} slot-item`}>
            {props?.icon ?
              <img
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