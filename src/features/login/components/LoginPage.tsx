import './LoginPage.css'

function LoginPage(props: {loginWithGoogle: any}) {


  return (
    <>
      <section className='login-page flex col'>
        <div className='menu'>
          <h2>Bienvenido a <b>Otro Juego Web para Portafolio</b></h2>
          <button onClick={() => props.loginWithGoogle()}>Login</button>
        </div>
      </section>
    </>
  )
}

export default LoginPage