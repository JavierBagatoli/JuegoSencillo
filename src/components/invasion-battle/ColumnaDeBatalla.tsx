import naveTeamOne from "../../assets/mapa/ufo.png"

import "../../index.css"

function ColumnaDeBatalla(
  props: {vectPos: number[]}
) {

  return (
    <div className="flex col">
      {props.vectPos.map(val =>
        <div style={{height: '4rem', width: '4rem', backgroundColor: '#aaaaaa'}}>
          <img style={{width: '100%', height: '50%'}} src={naveTeamOne}></img>

          <span>{val+1}</span>
        </div>
      )}
    </div>
  )
}

export default ColumnaDeBatalla