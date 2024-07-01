import React, { useContext, useEffect, useState } from 'react';
import "./Termini.css";
import axios from 'axios';
import { AuthContext } from "../context/authContext.js";
import Swal from "sweetalert2"
const Termini = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [termini, setTermini] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const [satnica, setSatnicaDatum] = useState('');
  const [idTreninga, setIdTreninga] = useState('');
  const [treninzi, setTreninzi] = useState([]);
  const [info,setInfo] = useState([]);
  const [korisnik,setKorisnik] = useState([])

  useEffect(() => {
    const fetchKorisnik = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/users/info/korisnici/${currentUser.id}`);
        setKorisnik(res.data[0]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchKorisnik();
  }, []);


  useEffect(() => {
    const fetchTreninzi = async () => {
      try {
        const res = await axios.get('http://localhost:8800/api/termini/trening');
        setTreninzi(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTreninzi();
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8800/api/termini/${currentUser.id}`);
      setTermini(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  

  const handleRowClick = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(satnica)
      await axios.post('http://localhost:8800/api/termini/dodaj/termin', { satnica, id_treninga: idTreninga });
      console.log('Termin uspješno dodat');
      window.location.reload()
      
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id_termina) => {
    Swal.fire({
      title: "Da li ste sigurni??",
      text: "Necete moci da vratite ovo!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Da, izbrisi!"
    }).then(async (result) => {  // Mark the function as async here
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:8800/api/termini/del/${id_termina}`);
          
          console.log('Termin uspješno izbrisan');
          await fetchData()
          Swal.fire({
            title: "Izbrisano!",
            text: "Termin je uspjesno izbrisan.",
            icon: "success"
          });
        } catch (err) {
          console.error(err);
        }
      }
    });
  };

  const handleClick = async (termin) => {
    
    try {
      const values = {
         id_usera: currentUser.id,
         id_termina: termin.id_termina
      }
      if (getTotalCount(termin.id_termina)>20){
        alert("Nazalost, ovaj termin je pun.Nema vise slobodnih mjesta")
        return;
      }
      const today = new Date();
      const expirationDate = new Date(korisnik.clanarinaDo);
      
    if (expirationDate < today) {
      alert(`Korisniku je istekla članarina!`);
      return ;
    }
      
      const res = await axios.post("http://localhost:8800/api/termini/rezervisi",values);
      console.log(res)
      alert('Rezervacija uspješna');
      await fetchData()
      
     // alert('Rezervacija uspješna');
    } catch (err) {
      console.log(err)
    }
  };
 

  useEffect(()=>{
    fetchData2()
  },[]);
  const fetchData2 = async ()=> {
    try{
      const res = await axios.get(`http://localhost:8800/api/termini/izlistaj/svikorisnici`)
      setInfo(res.data)
    }catch(err){
     console.log(err)
    }
   };
   
  const getTotalCount = (id_termina) => {
    fetchData2()
    return info.filter(podaci => podaci.id_termina === id_termina).length;
  };
  return (
    <div className="rezervacije">
      <h1 className='naslov'>Termini</h1>
      {currentUser.id === 4 && (
        <div>
          <form onSubmit={handleSubmit}>
            <label>
              Datum i satnica:
              <input
                type="datetime-local"
                value={satnica}
                onChange={(e) => setSatnicaDatum(e.target.value)}
              />
            </label>
            <br />
            <label>
              Trening:
              <select value={idTreninga} onChange={(e) => setIdTreninga(e.target.value)}>
                <option value="">Odaberi trening...</option>
                {treninzi.map((trening) => (
                  <option key={trening.id_treninga} value={trening.id_treninga}>
                    {trening.ime_treninga} - {trening.ime_trenera}
                  </option>
                ))}
              </select>
            </label>
            <br />
            <button type="submit">Dodaj termin</button>
          </form>
        </div>
      )}
      <table className='termini'>
        <thead>
          <tr>
            <th>Ime treninga</th>
            <th>Ime trenera</th>
            <th>Datum</th>
            <th>Satnica</th>
            <th>Akcija</th>
          </tr>
        </thead>
        <tbody>
          {termini.map((termin) => (
            <React.Fragment key={termin.id_termina}>
              <tr onClick={() => handleRowClick(termin.id_termina)}>
                <td className='col'>{termin.ime_treninga}</td>
                <td className='col'>{termin.ime_trenera}</td>
                <td className='col'>{new Date(termin.vrijeme).toLocaleDateString()}</td>
                <td className='col'>{new Date(termin.vrijeme).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                {currentUser.id !== 4 && (<td className='col'><button className='zakazi' onClick={()=> handleClick(termin)}>Zakazi</button></td>)}
                {currentUser.id === 4 && (<td className='col'><button onClick={() => handleDelete(termin.id_termina)}className='zakazi'>Izbrisi</button></td>)}
              </tr>
              {expandedRows.includes(termin.id_termina) && (
                <tr className='dodatak'>
                  <td colSpan="5">{termin.opis_treninga}</td>
                </tr>
              )}
               {currentUser.id === 4 && expandedRows.includes(termin.id_termina) && (
              <>
                {info.filter(podaci => podaci.id_termina === termin.id_termina).map((podaci) => (
                  <tr key={podaci.id} className='dodatak'>
                    <td colSpan="5">{podaci.id} - {podaci.ime} - {podaci.prezime}</td>
                  </tr>
                ))}
                <tr className='dodatak'>
                  <td colSpan="5">Ukupno vjezbaca: {getTotalCount(termin.id_termina)}</td>
                </tr>
              </>
            )}
             
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Termini;
