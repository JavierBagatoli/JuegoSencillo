import fotoPerfil from '../../assets/icons/dagas.png'
import f2 from '../../assets/icons/escopeta-fuego.png'
import f3 from '../../assets/icons/potion.png'
import f4 from '../../assets/icons/sword.png'

import './ConfigPerfilPage'

function ConfigPerfilPage() {
  const vectorImagen: any[] = [fotoPerfil, f2, f3,f4]

  return (
    <>
      <section style={{backgroundColor: '#7e6969'}} 
      
      className='flex col pad-1'>

        <span>Nombre:</span>
        <input>
        </input>

        <span>Seleccione la Imagen de Perfil:</span>
        <div className='flex'>
          {
            vectorImagen.map(val => 
              <img
                style={{backgroundColor: '#aaaaaa'}}
                src={val}
              />)
          }
          
        </div>
      </section>
    </>
  )
}

export default ConfigPerfilPage