import type { Mochila } from "../../App"

function ItemVenta(
  props: {
    mochila: Mochila,
    item: string
  }
) {
  return (
    <>
      <div className="flex row">
        <span>{props.item}</span>
        {
          Object.entries(props.mochila).map(([_name,value]) =><>
            <span>{value}</span>
          </>)
        }
        <button>Comprar</button>
      </div>
    </>
  )
}

export default ItemVenta

