import React from 'react'
import './Header.css'
import logo from "./forestino-logotip-beli-200x200.png"
import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from 'react'
import Navbar from './Navbar';

const Header = () => {
  const [showNav,setShowNav] = useState(false)
  return (
    <div className='header'>
        <div className="prvi">
        <GiHamburgerMenu className="hamb" onClick={() => setShowNav(!showNav)}/>
        </div>
        <div className="drugi">
        <img src={logo} alt='Logo'/>
        </div>
        <div className="treci">
        
        </div>   
        <Navbar showNav={showNav} />    
    </div>
  )
}

export default Header
