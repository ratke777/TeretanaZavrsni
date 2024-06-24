import React from 'react'
import logo from "../components/forestino.png"
import "./Register.css"
const Register = () => {
  return (
    <div className='login'>
    <div className="logo">
      <img src={logo} alt="logo" style={{marginBottom:'10px'}} />
    </div>
    <div className="loginForm">
      <h1>Registruj se!</h1>
      <input type="text" placeholder='Ime' name='ime' />
      <input type="text" placeholder='Prezime' name='prezime' />
      <input type="text" placeholder='Username' name='username' />
      <input type="text" placeholder='Broj kartice' name='broj' />
      <input type="password" placeholder='Lozinka' name='password' />
      <input type="password" placeholder='Potvrdi lozinku' name='password2' />
      <button className='registracija'>Registracija</button>
    </div>
    <div className="prijavi">
      <p>Imas nalog? <a href="/login">Prijavi se</a></p>
    </div>

    
  </div>
  )
}

export default Register
