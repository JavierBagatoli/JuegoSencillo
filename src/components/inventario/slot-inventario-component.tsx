import escopeta from "../../assets/icons/escopeta.png"
import armadura from "../../assets/icons/armadura.png"


function SlotInvetario(
  props: {
    id: string,
    slotSlected: string | null
    icon: string,
    selected: Function
  }
) {
  return (
    <>
       <div onClick={() => props.selected(props.id)}
          className={`${props.slotSlected === props.id? 'slot-item-selected' : ''} slot-item`}>
            {props?.icon &&

            <img src={props?.icon || ''}/>
            }
        </div>

  </>)
}

export default SlotInvetario