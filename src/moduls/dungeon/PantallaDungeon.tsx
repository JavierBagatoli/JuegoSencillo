import bestiario from '../../assets/monster/monsters'
import type { EnemyStatscontrol } from '../../components/models/enemy.interfaces'
import type { levelsAvalibles } from '../../components/models/levels-avalibles.interfaces'
import type { PlayerStatsControl } from '../../components/models/player.interfaces'
import ToolTipAtributo from '../../components/ToolTipAtributo'

function PantallaDungeon(
  props: {
    playerStats: PlayerStatsControl,
    statusEnemy: EnemyStatscontrol,
    startMission: Function,
    levelSelected: levelsAvalibles,
    varLevel: 0 | 1 | 2 | 3,
    enemyToShow: number,
  }
) {
  const selectMonster = () => {
    if(props.levelSelected === 0){
      return bestiario.monsterT1[props.enemyToShow]
    }else if(props.levelSelected === 1){
      return bestiario.monsterT2[props.enemyToShow]
    }else if(props.levelSelected === 2){
      return bestiario.monsterT3[props.enemyToShow]
    }else if(props.levelSelected === 3){
      return bestiario.monsterT4[props.enemyToShow]
    }
  }



  return (
    <>
      {
        props.playerStats.life > 0? 
          <div className={`back-${props.levelSelected+1}-${props.varLevel} center dungeon-view flex col`}>
            <div className='flex row center'>
              <div className='flex col'>
                <ToolTipAtributo
                  text='Vida'
                  highContrast={true}
                  actualValue={props.statusEnemy.life}
                  maxValue={props.statusEnemy.lifeMax}
                />

              {props.statusEnemy.life > 0 ?
                <img 
                  className='monster'
                  src={selectMonster()}/>
                : <div className='monster'></div>
              }
              </div>
            </div>
            <div>
              <ToolTipAtributo
                text='Vida'
                highContrast={true}
                actualValue={props.playerStats.life}
                maxValue={props.playerStats.lifeMax}
              />
              <ToolTipAtributo
                text='Acciones'
                highContrast={true}
                actualValue={props.playerStats.actions}
                maxValue={props.playerStats.actionsMax + props.playerStats.bonos.actions}
              />
              <ToolTipAtributo
                text='Defensa'
                highContrast={true}
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