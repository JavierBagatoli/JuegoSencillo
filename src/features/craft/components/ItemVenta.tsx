import type { Mochila } from "../../App"

function ItemVenta(
  props: {
    mochila: Mochila,
    item: string
  }
) {
  const comprar = () => {

  }

  return (
    <>
      <div className="flex row">
        <span>{props.item}</span>
        {
          Object.entries(props.mochila).map(([_name,value]) =><>
            <span>{value}</span>
          </>)
        }
        <button onClick={() => comprar()}>Comprar</button>
      </div>
    </>
  )
}

export default ItemVenta

