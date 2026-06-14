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
      <div className="flex row center">
        <span className={`${props.highContrast?'high-contrast': ''}`}>{props.text} : {props.actualValue} / {props.maxValue}</span>
      </div>
    </>
  )
}

export default ToolTipAtributo