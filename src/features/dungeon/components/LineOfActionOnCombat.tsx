import "./DungeonPage.css"
import closeItem from '../../../assets/icons/close-icon.png'

function LineOfActionOnCombat(
  props: {
    actions: string[],
    deleteAction: React.Dispatch<string[]>,
  }
) {
    const traslateAction = (action: string) => {
        const act: string = action.toLowerCase()
        if(act === "atk"){
            return "Ataque"
        }else if(act === "def"){
            return "Defender"
        }
    }

    const updateVectorActions = (index: number) => {
        props.deleteAction(
            props.actions.filter((_v: string, i: number) => i !== index)
        )
    }


    return (
        <section className="flex row pad-05 bar-actions" >
        {props.actions.map((val, index: number) => <>
            <div className="tag-actions flex row">
                <span>
                    {traslateAction(val)}
                </span>
                <img 
                    onClick={() => updateVectorActions(index)}
                    className="tag-close"
                    src={closeItem}></img>
            </div>
            </>)
        }
        </section>
    )
}

export default LineOfActionOnCombat