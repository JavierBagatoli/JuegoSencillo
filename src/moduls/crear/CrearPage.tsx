import { useState } from "react"
import type { Mochila } from "../../App"
import "./CrearPage.css"
import type { InvetoryPlayer } from "../../components/models/player.interfaces"
import { useCarft, type itemToSell } from "../../hooks/useCraftContext"

function CrearPage(
  props: {
    mochila: Mochila,
    updateMochila: Function,
    invetory: InvetoryPlayer[],
    updateInventario: React.Dispatch<React.SetStateAction<InvetoryPlayer[]>>
  }
) {
  const context = useCarft()

   const [extendText, setExtendText] = useState<string>('')
  const [effect, setEffect] = useState<"successBuy" | "errorBuy" | "">()
  const [index, setIndex] = useState<number | null>()
  
  function handleBuy(index: number, i: number){
    const metalesFinal = props.mochila.metales - (context.items[index].cost.metal ?? 0);
    const nucleFinal = props.mochila.nucleosEnergeticos - (context.items[index].cost.nucleo ?? 0);
    const circuitoFinal = props.mochila.circuito - (context.items[index].cost.circuito ?? 0);
    const cristalFinal = props.mochila.cristales - (context.items[index].cost.cristal ?? 0);

    setIndex(i)
    setTimeout(() => {
      setEffect("")
      setIndex(null)
    },500)

    console.log("index >", index, "el otro i>",i, metalesFinal, nucleFinal, circuitoFinal, cristalFinal)

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
    context.craftItem({
      idUser:1, idItem: index
    });

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

  function spanTextoBuy(val: itemToSell, i: number){
    const circuito: boolean = (val.cost.circuito ?? 0) <= props.mochila.circuito
    const nucleo:   boolean = (val.cost.nucleo ?? 0)  <= props.mochila.nucleosEnergeticos
    const metales:  boolean = (val.cost.metal ?? 0) <= props.mochila.metales
    const cristales:boolean = (val.cost.cristal ?? 0) <= props.mochila.cristales 

    return <>
      <td className="left"><span>{val.title}</span></td>
      <td><span className={circuito ? 'green' : ''}>{val.cost.circuito || "-"}</span></td>
      <td><span className={nucleo   ? 'green' : ''}>{val.cost.nucleo || "-"}</span></td>
      <td><span className={metales  ? 'green' : ''}>{val.cost.metal || "-"}</span></td>
      <td><span className={cristales? 'green' : ''}>{val.cost.cristal || "-"}</span></td>
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
                context.items.map((obj, i) => <tr key={i} className={`${index === i? effect : ''}`}>
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