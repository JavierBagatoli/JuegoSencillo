function SlotInvetario(
  props: {
    id: string,
    slotSlected: string | null
    icon: string,
    selected: Function,
    cant: number | null
  }
) {
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
              <span className={(props.cant || 0) > 0? 'tooltip-count': ''}>{props.cant || ''}</span>
            </div>
        </div>

  </>)}

export default SlotInvetario