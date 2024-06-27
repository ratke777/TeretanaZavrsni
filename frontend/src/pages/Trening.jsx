import "./Trening.css"
import React, { useContext, useEffect, useState } from 'react';
import "./Termini.css";
import axios from 'axios';
import { AuthContext } from "../context/authContext.js";
import Swal from "sweetalert2"
const Trening = () => {
   const [expandedRows, setExpandedRows] = useState([]);
   const handleRowClick = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };
    const {currentUser} = useContext(AuthContext)
    const [tr,setTr]= useState([]);
    const [ime_treninga,setIme] = useState("");
    const [ime_trenera,setTre] = useState("");
    const [opis_treninga,setOpi] = useState("");
    useEffect(() => {
      const fetchTreninzi = async () => {
        try {
          const res = await axios.get('http://localhost:8800/api/termini/trening');
          setTr(res.data);
        } catch (err) {
          console.error(err);
        }
      };
      fetchTreninzi();
    }, []);
  
   
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        
        await axios.post('http://localhost:8800/api/termini/dodaj/trening', { ime_treninga, ime_trenera,opis_treninga });
        console.log('Trening uspješno dodat');
        window.location.reload()
        
      } catch (err) {
        console.error(err);
      }
    };
    const handleDelete = async (id_treninga) => {
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
            await axios.delete(`http://localhost:8800/api/termini/deltrening/${id_treninga}`);
            setTr(tr.filter(tr => tr.id_treninga !== id_treninga));
            console.log('Termin uspješno izbrisan');
    
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
   
    return (
      <div className="rezervacije">
        <h1 className='naslov'>Svi treninzi</h1>
        {currentUser.id === 4 && (
          <div>
            <form onSubmit={handleSubmit}>
              <label>
                Ime treninga:
                <input
                  type="text"
                  value={ime_treninga}
                  onChange={(e) => setIme(e.target.value)}
                />
              </label>
              <br />
              <label>
                Ime trenera:
               
                
                <input
                  type="text"
                  value={ime_trenera}
                  onChange={(e) => setTre(e.target.value)}
                />
           
              </label>
              <br />
              <label>
                Opis Treninga
               
                
                <textarea
                  type="text"
                  value={opis_treninga}
                  onChange={(e) => setOpi(e.target.value)}
                />
           
              </label>
              <br/>
              <button type="submit">Dodaj trening</button>
            </form>
          </div>
        )}
        <table className='termini'>
          <thead>
            <tr>
              <th>Ime treninga</th>
              <th>Ime trenera</th>
              
              <th>Akcija</th>
            </tr>
          </thead>
          <tbody>
            {tr.map((trening) => (
              <React.Fragment key={trening.id_treninga}>
                <tr onClick={() => handleRowClick(trening.id_treninga)}>
                  <td className='col'>{trening.ime_treninga}</td>
                  <td className='col'>{trening.ime_trenera}</td>
                 
                
                  {currentUser.id === 4 && (<td className='col'><button onClick={() => handleDelete(trening.id_treninga)}className='zakazi'>Izbrisi</button></td>)}
                </tr>
                {expandedRows.includes(trening.id_treninga) && (
                <tr className='dodatak'>
                  <td colSpan="5">{trening.opis_treninga}</td>
                </tr>
              )}
               
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
export default Trening
