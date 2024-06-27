import React, { useContext, useState } from 'react'
import './Login.css'
import logo from "../components/forestino.png"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../context/authContext'
const Login = () => {
  const navigate = useNavigate()
  const [err,setError] = useState()
  const [inputs,setInputs]= useState({
    username:"",
    password:""
  });
  const handleChange = e =>{
    setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
}
const {login} = useContext(AuthContext);

const handleSubmit = async e=>{
  e.preventDefault()
  try{
    if( !inputs.password || !inputs.username){
      setError("Sva polja su obavezna");
    return}
    await login(inputs)
    const res = await axios.post("http://localhost:8800/api/auth/login",inputs)
    navigate("/")
  console.log(res)
  }
  catch(err){
      setError(err.response.data.message );
 
  }
}

  return (
    <div className='login'>
      <div className="logo">
        <img src={logo} alt="logo" style={{marginBottom:'10px'}} />
      </div>
      <div className="loginForm">
        <h1>Prijavi se!</h1>
        <input type="text" placeholder='Username' name='username' onChange={handleChange}/>
        <input type="password" placeholder='Lozinka' name='password' onChange={handleChange}/>
        <button className='prijava' onClick={handleSubmit}>Prijava</button>
        {err && <p style={{ color: "red" }}>{err}</p>}
      </div>
      <div className="registruj">
        <p>Nemas nalog? <a href="/register">Registruj se</a></p>
      </div>

      
    </div>
  )
}

export default Login
