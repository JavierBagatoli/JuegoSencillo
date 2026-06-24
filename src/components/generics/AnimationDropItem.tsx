import { useEffect, useState } from "react"
import "./AnimationDropItem.css"
import metal from "../../assets/resourses/metal.png"
import circuit from "../../assets/resourses/circuit.png"
import cores from "../../assets/resourses/cores.png"
import crystal from "../../assets/resourses/crystals.png"
import type { TypesOfDrop } from "../models/typesOfDrops.enum"

function AnimationDropItem(
  props:{
    setShow: Function,
    typeDrop: TypesOfDrop
  }
) {
  const [s, setS] = useState<boolean>(false)

  useEffect(() => {
    if(props.typeDrop !== "none"){
      setS(val => {
        if(!val){
          setTimeout(() => {
            setS(false)
          }, 1300)
          return true
        }
        return val
      })

    }
  },[props.typeDrop !== "none"])

  function selectImageDrop(){
    switch (props.typeDrop) {
      case "metal":
        return metal
      case "circuit":
        return circuit
      case "cores":
        return cores
      case "crystal":
        return crystal
    }
  }

  function addAnimation(){
    return s? <img style={{marginLeft: `${Math.random()*5+12}rem`}} className="drop" src={selectImageDrop()}/>: <></>
  }

  return (
    <div style={{position: 'absolute'}}>
       {addAnimation()}
  </div>)}

export default AnimationDropItem