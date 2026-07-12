import { useState } from "react"
import type { Mochila } from "../../App"
import { ARMORY } from "../../components/initialData/armory.init"
import type { Weapon } from "../../components/models/items-fight.interfaces"
import "./CrearPage.css"
import type { InvetoryPlayer } from "../../components/models/player.interfaces"

function CrearPage(
  props: {
    mochila: Mochila,
    updateMochila: Function,
    invetory: InvetoryPlayer[],
    updateInventario: React.Dispatch<React.SetStateAction<InvetoryPlayer[]>>
  }
) {
  const listaItems: Record<number, Weapon> = ARMORY
  const [extendText, setExtendText] = useState<string>('')
  const [effect, setEffect] = useState<"successBuy" | "errorBuy" | "">()
  const [index, setIndex] = useState<number | null>()
  
  function handleBuy(index: number, i: number){
    const metalesFinal = props.mochila.metales - listaItems[index].metales;
    const nucleFinal = props.mochila.nucleosEnergeticos - listaItems[index].nucleosEnergeticos;
    const circuitoFinal = props.mochila.circuito - listaItems[index].circuito;
    const cristalFinal = props.mochila.cristales - listaItems[index].cristales;

    setIndex(i)
    setTimeout(() => {
      setEffect("")
      setIndex(null)
    },500)
    if(metalesFinal < 0 || 
        nucleFinal < 0 || 
        circuitoFinal < 0 || 
        cristalFinal < 0
      ){
        //notifyError("No puedes Comprar")
        setEffect("errorBuy")
        return
      }

    
    setEffect("successBuy");
    props.updateMochila((_val: Mochila)=>{
      return {
          metales: metalesFinal,
          nucleosEnergeticos: nucleFinal,
          circuito: circuitoFinal,
          cristales: cristalFinal,
        }
    })

    props.updateInventario((prev) => {
      const existe = prev.find(item => item.id === index);
      if (existe) {
        return prev.map(item =>
          item.id === index
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }

      return [...prev, { id: index, cantidad: 1 }];
    });
    
  }

  function spanTextoBuy(val: Weapon, i: number){
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
            onClick={() => handleBuy(val.id,i)}>
            Comprar
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
                Object.values(listaItems).map((obj, i) => <tr key={i} className={`${index === i? effect : ''}`}>
                  {
                    spanTextoBuy(obj, i)
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

export default CrearPage