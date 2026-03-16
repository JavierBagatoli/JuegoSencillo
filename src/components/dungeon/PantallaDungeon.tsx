import type { PlayerStatsControl } from "../models/player.interfaces"
import ToolTipAtributo from "../ToolTipAtributo"
import sword from '../../assets/icons/sword.png'
import shield from '../../assets/icons/shield.png'
import potion from '../../assets/icons/potion.png'
import bestiario from '../../assets/monster/monsters'
import type { EnemyStatscontrol } from "../models/enemy.interfaces"

function PantallaDungeon(
  props: {
    statusPlayer: PlayerStatsControl,
    statusEnemy: EnemyStatscontrol,
  }
) {
  return (
    <>
      {
        props.statusPlayer.life > 0?

      
      <div className='dungeon-view flex col'>
        <div className='flex row center'>
          <div className='flex col'>
            <ToolTipAtributo
              text='Vida'
              actualValue={props.statusEnemy.life}
              maxValue={props.statusEnemy.lifeMax}
            />

          {props.statusEnemy.life > 0 ?
            <img 
              className='monster'
              src={bestiario.monsterT1[0]}/>
            : <div className='monster'></div>
          }
          </div>
        </div>
        <div id='toolbar' className='flex row center'>
          <img src={shield}/>
          <img src={sword}/>
          <img src={potion}/>
        </div>
        <div>

        <ToolTipAtributo
          text='Vida'
          actualValue={props.statusPlayer.life}
          maxValue={props.statusPlayer.lifeMax}
        />
        <ToolTipAtributo
          text='Acciones'
          actualValue={props.statusPlayer.actions}
          maxValue={props.statusPlayer.actionsMax + props.statusPlayer.bonos.actions}
        />
        <ToolTipAtributo
          text='Defensa'
          actualValue={props.statusPlayer.bonos.defense}
          maxValue={99}
        />
        </div>
      </div>
      : <div className='flex row center'>
        <h2>Quedas inconciente</h2>

      </div>
      }

    </>
  )
}

export default PantallaDungeon