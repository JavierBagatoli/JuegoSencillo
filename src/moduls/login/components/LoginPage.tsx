import './LoginPage.css'

function LoginPage(props: {handleLogin: Function}) {

  const handleLogin = () =>{
    props.handleLogin(true)
  }

  return (
    <>
      <section className='login-page flex col'>
        <div className='menu'>
          <h2>Bienvenido a "Nombre en Diseño"</h2>
          <button onClick={() =>handleLogin()}>Login</button>
        </div>
      </section>
    </>
  )
}

export default LoginPage