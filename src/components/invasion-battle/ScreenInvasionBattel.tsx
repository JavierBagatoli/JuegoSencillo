import nave from "../../assets/mapa/ufo.png"
import jefe from "../../assets/monster/slime.png"
import "../../index.css"


function ScreenInvasionBattle() {
  return (
    <section 
        style={{maxWidth: '30rem', width: '30rem', backgroundColor: 'gray'}}
        className="flex col pad-05 max-h">
      <div className="flex col w-full">
        <h3 className="flex center">Invasion</h3>
        <section className="flex row pad-1 center">
          <img src={nave}></img>
          <img src={nave}></img>
        </section>
        <section className="flex col center w-full">
          <img width="10rem" src={jefe}></img>
          <span>Invasor del Espacio</span>
        </section>

      </div>
    </section>
  )
}

export default ScreenInvasionBattle