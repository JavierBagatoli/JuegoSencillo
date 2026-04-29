import bestiario from '../../assets/monster/monsters'
import type { EnemyStatscontrol } from '../../components/models/enemy.interfaces'
import type { PlayerStatsControl } from '../../components/models/player.interfaces'
import ToolTipAtributo from '../../components/ToolTipAtributo'

function PantallaDungeon(
  props: {
    playerStats: PlayerStatsControl,
    statusEnemy: EnemyStatscontrol,
    startMission: Function
  }
) {
  return (
    <>
      {
        props.playerStats.life > 0? 
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
            <div>
              <ToolTipAtributo
                text='Vida'
                actualValue={props.playerStats.life}
                maxValue={props.playerStats.lifeMax}
              />
              <ToolTipAtributo
                text='Acciones'
                actualValue={props.playerStats.actions}
                maxValue={props.playerStats.actionsMax + props.playerStats.bonos.actions}
              />
              <ToolTipAtributo
                text='Defensa'
                actualValue={props.playerStats.bonos.defense}
                maxValue={99}
              />
            </div>
          </div>
        : <div className='flex col center dungeon-view'>
            <h2>Quedas inconciente</h2>
            <button 
              onClick={() => props.startMission(false)}
              style={{height: '2rem'}}>
              Salir
            </button>
          </div>
      }
    </>
  )
}

export default PantallaDungeon