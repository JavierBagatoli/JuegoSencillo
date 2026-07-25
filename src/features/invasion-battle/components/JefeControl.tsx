import Terra0 from "../../../assets/boss/terra/terra_0.png"
import Terra1 from "../../../assets/boss/terra/terra_1.png"
import Terra2 from "../../../assets/boss/terra/terra_2.png"

import Flor0 from "../../../assets/boss/flor/flor_0.png"
import Flor1 from "../../../assets/boss/flor/flor_1.png"
import Flor2 from "../../../assets/boss/flor/flor_2.png"

import Tempano0 from "../../../assets/boss/tempano/tempano_0.png"
import Tempano1 from "../../../assets/boss/tempano/tempano_1.png"
import Tempano2 from "../../../assets/boss/tempano/tempano_2.png"


function JefeControl(props: {
    boss: {
        type: "Terra" | "Flor" | "Tempano"
        life: number,
        lifeMax: number,
    }
}) {
    const sprites = {
        Terra: [Terra0, Terra1, Terra2],
        Flor: [Flor0,Flor1,Flor2],
        Tempano: [Tempano0, Tempano1, Tempano2],
    }

    const controOfBoss = () => {
        const porcentajeOfLife = props.boss.life / props.boss.lifeMax
        const spriteSelected = sprites[props.boss.type]
        
        let index = porcentajeOfLife > 0.60 ? 0 : 1
        if(porcentajeOfLife < 0.30){
            index = 2
        }

        return spriteSelected[index];
    }


  return (
    <section>
        <img className="boss" src={controOfBoss()}></img>
    </section>
  )
}

export default JefeControl