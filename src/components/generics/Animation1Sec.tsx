import { useEffect, useState } from "react"

function Animation1sec(
  props:{
    show: boolean | null,
    setShow: Function,
    animation: any
  }
) {
  const [s, setS] = useState<boolean>(false)

  useEffect(() => {
    if(props.show === true){
      setS(val => {
        if(!val){
          setTimeout(() => {
            setS(false)
          }, 1000)
          return true
        }
        return val
      })

    }
    props.setShow(false)
  },[props.show === true])

  function addAnimation(){
    return s? <img style={{width: '10rem', height: '10rem'}} src={props.animation}/>: <></>
  }

  return (
    <div style={{position: 'absolute'}}>
       {addAnimation()}
  </div>)}

export default Animation1sec