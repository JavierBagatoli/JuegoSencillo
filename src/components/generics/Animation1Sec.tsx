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
      style={{marginLeft: `${Math.random()*15+3}rem`, marginTop: `${Math.random()*15+3}rem`}}
    ></div>: <></>
  }

  return (
    <div style={{position: 'absolute'}}>
       {addAnimation()}
  </div>)}

export default Animation1sec