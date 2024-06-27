import React, { useState } from 'react'
import logo from "../components/forestino.png"
import "./Register.css"
import axios from 'axios'
import { Navigate } from 'react-router-dom'
const Register = () => {
  const [err,setError]= useState(null)
  const [inputs,setInputs] = useState({
      username:"",
      ime:"",
      prezime:"",
      broj:"",
      password:"",
      password2:""
    
  })

  const handleChange = e =>{
      setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const handleSubmit = async e =>{
    e.preventDefault()
    try{
      if(!inputs.ime || !inputs.prezime || !inputs.password || !inputs.username || !inputs.broj){
        setError("Sva polja su obavezna");
      return}
      if(inputs.password!==inputs.password2){
        setError("Ponovo unesite lozinku");
        return
      }
      const res = await axios.post("http://localhost:8800/api/auth/register",inputs)
      Navigate("/login")
    console.log(res)
    }
    catch(err){
      setError(err.response.data.message || "Unknown error occurred");
      
    }
  }
    return (
    <div className='login'>
    <div className="logo">
      <img src={logo} alt="logo" style={{marginBottom:'10px'}} />
    </div>
    <div className="loginForm">
      <h1>Registruj se!</h1>
      <input required type="text" placeholder='Ime' name='ime' onChange={handleChange}/>
      <input required type="text" placeholder='Prezime' name='prezime' onChange={handleChange}/>
      <input required type="text" placeholder='Username' name='username' onChange={handleChange}/>
      <input required type="text" placeholder='Broj kartice' name='broj' onChange={handleChange}/>
      <input required type="password" placeholder='Lozinka' name='password' onChange={handleChange}/>
      <input required type="password" placeholder='Potvrdi lozinku' name='password2' onChange={handleChange}/>
      <button className='registracija' onClick={handleSubmit}>Registracija</button>
      {err && <p style={{ color: "red" }}>{err}</p>}
    </div>
    <div className="prijavi">
      <p>Imas nalog? <a href="/login">Prijavi se</a></p>
    </div>

    
  </div>
  )
}

export default Register
