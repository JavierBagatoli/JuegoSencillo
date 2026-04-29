import { useState } from "react"
import type { Mochila } from "../../App"
import { ARMORY } from "../../components/initialData/armory.init"
import type { Weapon } from "../../components/models/items-fight.interfaces"
import "./ComercioPage.css"

function ComercioPage(
  props: {
    mochila: Mochila,
    updateMochila: Function
  }
) {
  const listaItems: Record<number, Weapon> = ARMORY
  const [extendText, setExtendText] = useState<string>('')
  
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

  const handleExtend = (text: 'circuito' | 'nucleo' | 'metal' | 'cristal') => {
    if(!['circuito','nucleo','metal','cristal'].includes(text)){return}
    setExtendText((val: string) => val !== text? text: '')
  }
  

  return (
    <>
      <section className="max-w background-comercio">
        <table className="max-w">
          <thead>
            <tr>
              <th>Objeto</th>

              <th className="isCompact">Circuitos</th>
              <th className="isCompactOff" onClick={() => handleExtend('circuito')}>{extendText === 'circuito'? 'Circuitos':'Cir'}</th>
              
              <th className="isCompact">Nucleos</th>
              <th className="isCompactOff" onClick={() => handleExtend('nucleo')}>{extendText === 'nucleo'? 'nucleo':'nuc'}</th>
              
              <th className="isCompact">Metales</th>
              <th className="isCompactOff" onClick={() => handleExtend('metal')}>{extendText === 'metal'? 'metal':'met'}</th>
              
              <th className="isCompact">Cristales</th>
              <th className="isCompactOff" onClick={() => handleExtend('cristal')}>{extendText === 'cristal'? 'cristal':'cri'}</th>


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