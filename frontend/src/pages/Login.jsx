import React from 'react'
import './Login.css'
import logo from "../components/forestino.png"
const Login = () => {
  return (
    <div className='login'>
      <div className="logo">
        <img src={logo} alt="logo" style={{marginBottom:'10px'}} />
      </div>
      <div className="loginForm">
        <h1>Prijavi se!</h1>
        <input type="text" placeholder='Username' name='username' />
        <input type="password" placeholder='Lozinka' name='password' />
        <button className='prijava'>Prijava</button>
      </div>
      <div className="registruj">
        <p>Nemas nalog? <a href="/register">Registruj se</a></p>
      </div>

      
    </div>
  )
}

export default Login
