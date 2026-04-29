import { useState } from "react"
import naveTeamOne from "../../assets/mapa/ufo.png"
import naveTeamTwo from "../../assets/mapa/ufo.png"
import jefe from "../../assets/monster/slime.png"
import "../../index.css"
import ToolTipAtributo from "../ToolTipAtributo"
import ColumnaDeBatalla from "./ColumnaDeBatalla"


function ScreenInvasionBattlePage() {
  return (
    <section 
        style={{maxWidth: '30rem', width: '30rem', backgroundColor: 'gray'}}
        className="flex col pad-05 max-h">
      <div className="flex col w-full">
        <h3 className="flex center">Invasion</h3>
        <section className="flex col pad-1 center">
          <div className="flex row">
            <button onClick={() => handleSetShowTeam('one')}>Team 1</button>
            <button onClick={() => handleSetShowTeam('two')}>Team 2</button>
          </div>
          {
            showTeam === 'none' ? <div className="flex col">
              <span>Vista General</span>
              <div className="flex row">
                <img style={{width: '50%', height: '50%'}} src={naveTeamOne}></img>
                <img style={{width: '50%', height: '50%'}} src={naveTeamTwo}></img>
              </div>
            </div>: <div className="flex col">
                <span>Vista del equipo: {showTeam}</span>
                <div className="flex row">
                  <ColumnaDeBatalla
                    vectPos={[0,1,2]}
                  />

                  <ColumnaDeBatalla
                    vectPos={[3,4,5]}
                  />

                  <ColumnaDeBatalla
                    vectPos={[6,7,8]}
                  />
              
                </div>
              </div>
          }
        </section>
        <section className="flex col center w-full">
          <img style={{width: '50%', height: '50%'}}  src={jefe}></img>
          <ToolTipAtributo
            text='Invasor del Espacio'
            actualValue={10}
            maxValue={999}
          />
        </section>

      </div>
    </section>
  )
}

export default ScreenInvasionBattlePage