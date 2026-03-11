function ToolTipAtributo(
  props: {
    text:string,
    actualValue: number,
    maxValue: number
  }
) {
  return (
    <>
      <div className="flex row center">
        <span>{props.text}:</span><span>{props.actualValue}</span>/<span>{props.maxValue}</span>
      </div>

    </>
  )
}

export default ToolTipAtributo