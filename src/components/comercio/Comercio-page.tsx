import type { Mochila } from "../../App"
import "./comercio.css"

function ComercioPage(
  props: {
    mochila: Mochila,
    updateMochila: Function
  }
) {

  function isDisableBuy(index: number):boolean{
    let isDisable: boolean = false;

    props.updateMochila((val: Mochila)=>{
      const metalesFinal = val.metales - listaItems[index].metales;
      const nucleFinal = val.nucleosEnergeticos - listaItems[index].nucleosEnergeticos;
      const circuitoFinal = val.circuito - listaItems[index].cristales;
      const cristalFinal = val.cristales - listaItems[index].cristales;

      
      if(metalesFinal > 0 && 
        nucleFinal > 0 && 
        circuitoFinal > 0 && 
        cristalFinal > 0
      ){
        isDisable= true
    }})
    
    return isDisable
  }

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

  function spanTextoBuy(val: ItemCompra){
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
      <section className="section-tienda background-comercio pad-05">
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
                listaItems.map((obj) => <tr>
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

interface ItemCompra extends Mochila{
  nombre: string
}

const listaItems: ItemCompra[] = [
  {
    nombre: "Espada de Plasma",
    metales: 12,
    nucleosEnergeticos: 5,
    circuito: 3,
    cristales: 4,
  },
  {
    nombre: "Blaster Orbital",
    metales: 10,
    nucleosEnergeticos: 6,
    circuito: 4,
    cristales: 2,
  },
  {
    nombre: "Armadura de Titanio Estelar",
    metales: 20,
    nucleosEnergeticos: 2,
    circuito: 3,
    cristales: 1,
  },
  {
    nombre: "Escudo Cinético",
    metales: 8,
    nucleosEnergeticos: 4,
    circuito: 2,
    cristales: 2,
  },
  {
    nombre: "Lanza Fotónica",
    metales: 14,
    nucleosEnergeticos: 5,
    circuito: 3,
    cristales: 3,
  },
  {
    nombre: "Guanteletes de Gravedad",
    metales: 9,
    nucleosEnergeticos: 4,
    circuito: 4,
    cristales: 2,
  },
  {
    nombre: "Casco Neural de Combate",
    metales: 6,
    nucleosEnergeticos: 3,
    circuito: 6,
    cristales: 1,
  },
  {
    nombre: "Armadura de Exotraje Mk-I",
    metales: 18,
    nucleosEnergeticos: 4,
    circuito: 5,
    cristales: 2,
  },
  {
    nombre: "Rifle de Iones",
    metales: 11,
    nucleosEnergeticos: 5,
    circuito: 4,
    cristales: 2,
  },
  {
    nombre: "Daga Láser",
    metales: 6,
    nucleosEnergeticos: 3,
    circuito: 2,
    cristales: 2,
  },
  {
    nombre: "Generador de Escudo Personal",
    metales: 7,
    nucleosEnergeticos: 5,
    circuito: 5,
    cristales: 3,
  },
  {
    nombre: "Arco de Energía Cósmica",
    metales: 8,
    nucleosEnergeticos: 4,
    circuito: 3,
    cristales: 5,
  },
  {
    nombre: "Botas de Propulsión",
    metales: 7,
    nucleosEnergeticos: 3,
    circuito: 4,
    cristales: 2,
  },
  {
    nombre: "Cañón de Antimateria",
    metales: 16,
    nucleosEnergeticos: 8,
    circuito: 5,
    cristales: 4,
  },
  {
    nombre: "Armadura de Guardia Galáctico",
    metales: 15,
    nucleosEnergeticos: 4,
    circuito: 4,
    cristales: 2,
  }
];