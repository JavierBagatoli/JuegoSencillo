import type { Mochila } from "../../App"
import { ARMORY } from "../initialData/armory.init";
import type { Weapon } from "../models/items-fight.interfaces";
import "./comercio.css"

function ComercioPage(
  props: {
    mochila: Mochila,
    updateMochila: Function
  }
) {
  const listaItems: Record<number, Weapon> = ARMORY
  
  function handleBuy(index: number){
    props.updateMochila((val: Mochila)=>{
      const metalesFinal = val.metales - listaItems[index].metales;
      const nucleFinal = val.nucleosEnergeticos - listaItems[index].nucleosEnergeticos;
      const circuitoFinal = val.circuito - listaItems[index].cristales;
      const cristalFinal = val.cristales - listaItems[index].cristales;

      
      if(metalesFinal < 0 && 
        nucleFinal < 0 && 
        circuitoFinal < 0 && 
        cristalFinal < 0
      ){
        //notifyError("No puedes Comprar")
        return val
      }else{
        //notifySuccess("Compra Realizada")
        return {
          metales: metalesFinal,
          nucleosEnergeticos: nucleFinal,
          circuito: circuitoFinal,
          cristales: cristalFinal,
        }
      }

    })
  }

  function spanTextoBuy(val: Weapon){
    const circuito: boolean = val.circuito <= props.mochila.circuito
    const nucleo:   boolean = val.nucleosEnergeticos <= props.mochila.nucleosEnergeticos
    const metales:  boolean = val.metales <= props.mochila.metales
    const cristales:boolean = val.cristales <= props.mochila.cristales 

    return <>
      <td className="left"><span>{val.nombre}</span></td>
      <td><span className={circuito ? 'green' : ''}>{val.circuito}</span></td>
      <td><span className={nucleo   ? 'green' : ''}>{val.nucleosEnergeticos}</span></td>
      <td><span className={metales  ? 'green' : ''}>{val.metales}</span></td>
      <td><span className={cristales? 'green' : ''}>{val.cristales}</span></td>
      <td><button
            disabled={!circuito || !nucleo || !metales || !cristales}
            onClick={() => handleBuy(1)}>
            Comprar {circuito}
      </button></td>
    </>
  }

  return (
    <>
      <section className="section-tienda background-comercio">
        <table>
          <thead>
            <tr>
              <th>Objeto</th>
              <th>Circuitos</th>
              <th>Nucleos</th>
              <th>Metales</th>
              <th>Cristales</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              {
                Object.values(listaItems).map((obj) => <tr>
                  {
                    spanTextoBuy(obj)
                  }
                </tr>
                )
              }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default ComercioPage