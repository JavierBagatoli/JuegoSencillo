import { useEffect, useState } from "react"
import "./Animation1Sec.css"

function Animation1sec(
  props:{
    show: boolean | null,
    setShow: Function,
  }
) {
  const [s, setS] = useState<boolean>(false)

  useEffect(() => {
    if(props.show === true){
      setS(val => {
        if(!val){
          setTimeout(() => {
            setS(false)
          }, 300)
          return true
        }
        return val
      })

    }
    props.setShow(false)
  },[props.show === true])

  function addAnimation(){
    return s? <div className="hit"
      style={{marginLeft: `${Math.round(Math.random()*50+20)}dvw`, marginTop: `${Math.round(Math.random()*5+5)}rem`}}
    ></div>: <></>
  }

  return (
    <div style={{position: 'absolute'}}>
       {addAnimation()}
  </div>)}

export default Animation1sec