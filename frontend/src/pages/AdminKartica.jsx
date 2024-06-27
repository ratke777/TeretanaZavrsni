import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import "./AdminKartica.css"
const AdminKartica = () => {
  const [korisnici,setKorisnici] = useState([])


    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await axios.get('http://localhost:8800/api/users');
            setKorisnici(res.data);
          } catch (err) {
            console.log(err);
          }
        };
        fetchData();
      }, []);  
  return (
    <div className="sadrzaj">
    <h1 className='naslov'>Svi korisnici</h1>
    <button className='addNew'>Dodaj novog korisnika(samo karticu)</button>
     
  <table className='korisnici'>
    <thead>
      <tr>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Broj kartice</th>
        <th>Clanarina Od</th>
        <th>Clanarina Do</th>
      </tr>
    </thead>
    <tbody>
      {korisnici.map((korisnik) => (
        <React.Fragment key={korisnik.id}>
          <tr>
            <td className='col'>{korisnik.ime}</td>
            <td className='col'>{korisnik.prezime}</td>
            <td className='col'>{korisnik.broj_kartice}</td>
            <td className='col'>{korisnik.clanarinaOd}</td>
            <td className='col'>{korisnik.clanarinaDo}</td>
            <td className='col'><button className='zakazi'>Izmijeni</button></td>
          </tr>
          
           
        </React.Fragment>
      ))}
    </tbody>
  </table>
  </div>
  )
}

export default AdminKartica
