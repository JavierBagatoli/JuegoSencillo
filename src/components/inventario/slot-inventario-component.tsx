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
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            justifyItems: 'center'
          }}
          onClick={() => props.selected(props.id)}
          className={`${props.slotSlected === props.id? 'slot-item-selected' : ''} slot-item`}>
            {props?.icon &&
              <img
               style={{
                marginLeft: '0.5rem',
               }}
               src={props?.icon || ''}/>
            }
            <span style={{marginLeft: '0.5rem',color: 'white'}}>{props.cant || ''}</span>
        </div>

  </>)
}

export default SlotInvetario