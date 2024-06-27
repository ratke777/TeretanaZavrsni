import React, { useContext, useEffect, useState } from 'react'
import './Rezervacije.css'
import axios from 'axios'
import {AuthContext} from "../context/authContext.js"


const Rezervacije = () => {
  const [rezervacija,setRezervacije] = useState([])
  const {currentUser} = useContext(AuthContext)
  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await axios.get(`http://localhost:8800/api/users/rezervacije/${currentUser.id}`);
        setRezervacije(res.data);

      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[currentUser.id]);


  
    // Function to check if the reservation date is greater than Now
    const isFutureReservation = (reservationDate) => {
      const reservationDateObj = new Date(reservationDate);
      return reservationDateObj > new Date();
    };
  
  return (
    <div className='rezervacije'>
      <h1>Rezervisani termini</h1>
      <table className='rezerv'>
       <thead>
        <th className='rez'>Trening</th>
        <th className='rez'>Trener</th>
        <th className='rez'>Datum</th>
        <th className='rez'>Akcija</th>
       </thead>
       {rezervacija.map((rez)=>(
           <tr>
           <td>{rez.ime_treninga}</td>
           <td>{rez.ime_trenera}</td>
           <td>{rez.vrijeme}</td>
           <td> {isFutureReservation(rez.datum) ? (
             <button className='otkazi'>Otkazi</button>
           ) : (
             <span>Rezervacija je prošla</span>
           )}</td>
          </tr>

       )

       )}
      

      </table>
      
    </div>
  )
}

export default Rezervacije
