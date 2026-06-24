import "./ComercioPage.css"

function ComercioPage() {
  const listOfProducts: string[] = ['Kit de Reparacion', 'Combustible', 'Plano de habitacion']
  
  return (
    <>
      <section className="max-w background-inventario b2">
        <table className="max-w">
          <thead>
            <tr>
              <th>Objeto</th>
              <th>Precio</th>
              <th>Platino</th>
            </tr>
          </thead>
          <tbody>
              {
                listOfProducts.map(obj => <tr style={{width: '100%'}}>
                  {
                    <td style={{width: '100%'}}><span>{obj}</span></td>
                  }
                  <td>$30</td>
                  <td><button>Comprar</button></td>
                </tr>
                )
              }
          </tbody>
        </table>
      </section>
    </>
  )
}

export default ComercioPage