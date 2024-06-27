import React, { useContext, useEffect, useState } from 'react';
import "./Termini.css"
import axios from 'axios'
import {AuthContext} from "../context/authContext.js"
const Termini = () => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [termini,setTermini] = useState([])
  const {currentUser} = useContext(AuthContext)

  useEffect(()=>{
    const fetchData = async () =>{
      try{
        const res = await axios.get(`http://localhost:8800/api/termini/${currentUser.id}`)
        setTermini(res.data)
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
    },[currentUser.id])
  

  const handleRowClick = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter(rowId => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };
  const groupByDay = (data) => {
    return data.reduce((acc, termin) => {
      const day = new Date(termin.vrijeme).toLocaleDateString('hr-HR', { weekday: 'long' });
      if (!acc[day]) {
        acc[day] = [];
      }
      acc[day].push(termin);
      return acc;
    }, {});
  };

  return (
    
    <div className="rezervacije">
      <h1 className='naslov'>Termini</h1>
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
              <td className='col'><button className='zakazi'>Zakazi</button></td>
            </tr>
            {expandedRows.includes(termin.id_termina) && (
              <tr className='dodatak'>
                <td colSpan="5">{termin.opis_treninga}</td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default Termini;