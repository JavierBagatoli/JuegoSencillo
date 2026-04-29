function SeleccionNivelPage(
  props: {
    level: number,
    updateLevel: Function
    startMission: Function
  }
) {

  const handleLevel = (val: number) =>{
    props.updateLevel(val)
  }

  const handleStartMission = () =>{
    props.startMission(true)
  }

  //Me gustaria que los botones sean imagenes

  return (
    <>
      <section id="dungeon-selector-level">
        <div className="flex col pad-1 dungeon-selector-buttons">
          <button onClick={() => handleLevel(0)}>
            Minas
          </button>

          <button onClick={() => handleLevel(1)}>
            Laberinto
          </button>

          <button onClick={() => handleLevel(2)}>
            Ascensor
          </button>
          <button onClick={() => handleLevel(3)}>
            Pecio espacial
          </button>

          <button onClick={() => handleStartMission()}>
            Iniciar Exploracion
          </button>
        </div>
      </section>

    </>
  )
}

export default SeleccionNivelPage