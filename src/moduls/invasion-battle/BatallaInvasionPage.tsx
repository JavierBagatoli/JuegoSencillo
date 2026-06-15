import { useState } from "react"
import naveTeamOne from "../../assets/ships/Humans.png"
import naveTeamTwo from "../../assets/ships/Humans_2.png"
import jefe from "../../assets/monster/slime.png"
import ToolTipAtributo from "../../components/ToolTipAtributo"
import "../../index.css"
import ColumnaDeBatalla from "./component/ColumnaDeBatalla"

type HousesAvalibles = 'team1' | 'team2' | 'none'

function BatallaInvasionPage() {
  const [showTeam, setShowTeam] = useState<HousesAvalibles>('none')

  const handleSetShowTeam = (team: HousesAvalibles) => {
    setShowTeam((val) => val !== team? team: 'none')
  }

  return (
    <section 
        style={{maxWidth: '30rem', width: '30rem', backgroundColor: 'gray'}}
        className="flex col pad-05 max-h mapa-mundo">
      <div className="flex col w-full">
        <h3 className="flex center">Invasion</h3>
        <section className="flex col pad-1 center">
          <div className="flex row">
            <button onClick={() => handleSetShowTeam('team1')}>Team 1</button>
            <button onClick={() => handleSetShowTeam('team2')}>Team 2</button>
          </div>
          {
            showTeam === 'none' ? <div className="flex col">
              <span>Vista General</span>
              <div className="flex row">
                <img src={naveTeamOne}></img>
                <img src={naveTeamTwo}></img>
              </div>
              <div className="flex row">
                <img src={naveTeamOne}></img>
                <img src={naveTeamTwo}></img>
              </div>
            </div>: <div className="flex col">
                <span>Vista del equipo: {showTeam}</span>
                <div className="flex row">
                  <ColumnaDeBatalla
                    />

                  <ColumnaDeBatalla
                    />

                  <ColumnaDeBatalla
                    />
                </div>
              </div>
          }
        </section>
        <section className="flex col center w-full">
          <img src={jefe}></img>
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

export default BatallaInvasionPage