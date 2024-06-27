import React, { useContext, useState } from 'react'
import "./User.css"
import {AuthContext} from "../context/authContext.js"
import axios from 'axios'
import { useEffect } from 'react'


const User = () => {

  const {currentUser}= useContext(AuthContext)
  const [clanarina,setClanarina] = useState([]);
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/${currentUser.broj_kartice}`);
        setClanarina(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [currentUser.broj_kartice]);



const datumOd = clanarina.clanarinaOd
const datumDo = clanarina.clanarinaDo
//console.log(datumDo)

  return (
    <div className='Podaci'>
      <h1>Podaci o korisniku</h1>
      <table>
        <tbody>
          <tr>
            <th className='info'>Ime:</th>
            <th>{currentUser.ime}</th>
          </tr>
          <tr>
            <th className='info'>Prezime:</th>
            <th>{currentUser.prezime}</th>
          </tr>
          <tr>
            <th className='info'>Username:</th>
            <th>{currentUser.username}</th>
          </tr>
          <tr>
            <th className='info'>Broj kartice:</th>
            <th>{currentUser.broj_kartice}</th>
          </tr>
          <tr>
            <th className='info'>Clanarina vazi od:</th>
            <th>
              {formattedDate(datumOd)}
            </th>
          </tr>
          <tr>
            <th className='info'>Clanarina vazi do:</th>
            <th>{formattedDate(datumDo)}</th>
          </tr>
         
        </tbody>
      </table>
      
    </div>
  )
}

export default User
