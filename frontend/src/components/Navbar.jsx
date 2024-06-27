import React, { useContext } from 'react'
import './Navbar.css'
import { CiUser } from "react-icons/ci";
import { CiHome } from "react-icons/ci";
import { IoIosCheckboxOutline } from "react-icons/io";
import { CiViewTable } from "react-icons/ci";
import { GrContact } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { AuthContext } from '../context/authContext';

const Navbar = ({ showNav }) => {
  const {currentUser,logout} = useContext(AuthContext)


  return (
    
   <div className={`sidebar ${showNav ? 'active' : ''}`}>
     
      <div className="ime"><FaRegCircleUser />{currentUser?.ime}, dobrodosli</div>
     
    <ul>
       
       
        <li>
          <a href="/"><CiHome/>Pocetna</a>
        </li>
        <li>
          <a href="/user"><CiUser/>Podaci o korisniku</a>
        </li>
        <li>
          <a href="/rezervacije"><IoIosCheckboxOutline/>Rezervacije</a>
        </li>
        <li>
          <a href="/termini"><CiViewTable/>Termini</a>
        </li>
        <li>
          <a href="/kontakt"><GrContact/>Kontakt </a>
        </li>
        <li>
        <button className='logout' onClick={logout}><CiLogout/>Log out</button>
        </li>

    </ul>
   
   </div>
  

  )
}

export default Navbar
