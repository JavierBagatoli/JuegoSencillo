function InventarioPage() {
  const equipado = {
    arma: 0,
    armadura: 0,
  }
  const naveEspacio = {
    vida: 0,
    damage: 0,
    habitacion1: 0,
    habitacion2: 0,
    habitacion3: 0,
    habitacion4: 0,
    habitacion5: 0,
  }

  const inventarioReal: {id: number, cantidad: number}[] =[
    {
      id: 0,
      cantidad: 2,
    },
    {
      id: 1,
      cantidad: 2,
    },
  ]

  const biblioteca: Record<number, {
    nombre: string,
    descripcion: string,
    id: number,
  }> = {
    0: {
      nombre: 'Escopeta',
      descripcion: 'Arma antigua',
      id: 0,
    },
    1: {
      nombre: 'Armadura',
      descripcion: 'Armadura antigua',
      id: 1,
    },
    2: {
      nombre: 'Escopeta',
      descripcion: 'Arma antigua',
      id: 2,
    },
    3: {
      nombre: 'Escopeta',
      descripcion: 'Arma antigua',
      id: 3,
    },
  }

  return (
    <>
      <section className="flex col background-texto pad-05">
        <div>
          <h3>Equipo Personaje</h3>
            {
              Object.entries(equipado).map((key, value) => <div>
                  <span>{key}: {value}</span>
                </div>)
            }
          <h3>Equipo Nave Espacial</h3>
            {
              Object.entries(naveEspacio).map((key, value) => <div>
                  <span>{key}: {value}</span>
                </div>)
            }
          <h3>Inventario</h3>
            {
              inventarioReal.map(val => <span>{biblioteca[val.id].nombre}: {val.cantidad}  </span>)
            }
          
        </div>

      </section>
    </>
  )
}

export default InventarioPage