function ButtonImage(
  props: {
    onClick: () => void,
    idLevelSected: number,
    srcImg: any,
    name: string,
    idPost: number
  }
) {
  return (
    <button className='invisible button-img' onClick={props.onClick}>
      <span className='mid-contrast'>{props.name}</span>
      <img
        className={`${props.idLevelSected !== props.idPost? 'unselected': ''}`}
        src={props.srcImg}/>
    </button>
  )
}

export default ButtonImage