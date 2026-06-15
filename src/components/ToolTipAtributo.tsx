function ToolTipAtributo(
  props: {
    text:string,
    actualValue: number,
    maxValue: number
    highContrast?: boolean;
  }
) {

  return (
    <>
      <div className="flex row center" style={{justifyContent: 'start'}}>
        <span className={`${props.highContrast?'high-contrast': ''}`}>{props.text} : {props.actualValue} / {props.maxValue}</span>
      </div>
    </>
  )
}

export default ToolTipAtributo