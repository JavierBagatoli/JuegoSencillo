import fotoPerfil from '../../assets/icons/dagas.png'
import f2 from '../../assets/icons/escopeta-fuego.png'
import f3 from '../../assets/icons/potion.png'
import f4 from '../../assets/icons/sword.png'

import potion_1 from '../../assets/potions/damage.png'
import potion_2 from '../../assets/potions/more_drop.png'
import potion_3 from '../../assets/potions/more_energy.png'
import potion_4 from '../../assets/potions/precision.png'
import potion_5 from '../../assets/potions/regen.png'
import potion_6 from '../../assets/potions/resistance.png'
import potion_7 from '../../assets/potions/speed.png'
import potion_8 from '../../assets/potions/unvisible.png'

import './ConfigPerfilPage.css'

function ConfigPerfilPage() {
  const vectorImagen: any[] = [
    fotoPerfil,
    f2,
    f3,
    f4,
    potion_1,
    potion_2,
    potion_3,
    potion_4,
    potion_5,
    potion_6,
    potion_7,
    potion_8,]

    return (
    <>
      <section style={{backgroundColor: '#7e6969'}} 
      
      className='flex col pad-1 b2 background-inventario'>

        <span>Nombre:</span>
        <input>
        </input>

        <span>Seleccione la Imagen de Perfil:</span>
        <div className='flex row wrap pad'>
          {
            vectorImagen.map(val => 
              <div className='pfp_option'>
                <img
                  src={val}
                />

              </div>
            )
          }
          
        </div>
      </section>
    </>
  )
}

export default ConfigPerfilPage