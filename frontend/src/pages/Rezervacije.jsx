import React, { useContext, useEffect, useState } from 'react'
import './Rezervacije.css'
import axios from 'axios'
import {AuthContext} from "../context/authContext.js"
import Swal from "sweetalert2"

const Rezervacije = () => {
  const [rezervacija,setRezervacije] = useState([])
  const {currentUser} = useContext(AuthContext)
  useEffect(()=>{
    fetchData()
  },[currentUser.id]);
  const fetchData = async () =>{
    try{
      const res = await axios.get(`http://localhost:8800/api/users/rezervacije/${currentUser.id}`);
      setRezervacije(res.data);

    }catch(err){
      console.log(err);
    }
  };
  //fetchData();


  
    // Function to check if the reservation date is greater than Now
    const isFutureReservation = (reservationDate) => {
      
      const reservationDateObj = new Date(reservationDate);
     
      return reservationDateObj > new Date();
    };
   
    const formatDate = (dateString) => {
      const dateObj = new Date(dateString);
    
      if (isNaN(dateObj.getTime())) {
        console.error("Invalid date format:", dateString);
        return null;
      }
    
      const year = dateObj.getFullYear();
      const month = String(dateObj.getMonth() + 1).padStart(2, '0');
      const day = String(dateObj.getDate()).padStart(2, '0');
      const hours = String(dateObj.getHours()).padStart(2, '0');
      const minutes = String(dateObj.getMinutes()).padStart(2, '0');
    
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    };
    const handleSubmit = async (rezervacija) => {
      const result = await Swal.fire({
        title: "Jeste li sigurni?",
        text: "Vase mjesto nece biti cuvano!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Da,siguran sam!",
        cancelButtonText:"Odustajem"
      });
    
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:8800/api/termini/izbrisi/${rezervacija.id_rezervacije}`);
          console.log(rezervacija.id_rezervacije);
        
          await fetchData();
    
          Swal.fire({
            title: "Vasa rezervacija je izbrisana!",
            text: "Uspjesno ste obrisali rezervaciju!",
            icon: "success"
          });
        } catch (error) {
          console.error("There was an error deleting the reservation:", error);
          Swal.fire({
            title: "Error!",
            text: "There was a problem deleting your reservation. Please try again.",
            icon: "error"
          });
        }
      }
    };
    
   
     
    
    
  return (
    <div className='rezervacije'>
      <h1>Rezervisani termini</h1>
      <table className='rezerv'>
      <thead>
        <tr>
        <th className='rez'>Trening</th>
        <th className='rez'>Trener</th>
        <th className='rez'>Datum</th>
        <th className='rez'>Akcija</th>
        </tr>
        </thead>
        <tbody>
       {rezervacija.map((rez)=>(
           <tr key={rez.id_rezervacije}>
           <td>{rez.ime_treninga}</td>
           <td>{rez.ime_trenera}</td>
           <td>{formatDate(rez.vrijeme)}</td>
           <td> {isFutureReservation(rez.vrijeme) ? (
             <button className='otkazi' onClick={()=> handleSubmit(rez)}>Otkazi</button>
           ) : (
             <span>Rezervacija je prošla</span>
           )}</td>
          </tr>

       )
     

       )}
            </tbody>

      </table>
      
    </div>
  )
}

export default Rezervacije
