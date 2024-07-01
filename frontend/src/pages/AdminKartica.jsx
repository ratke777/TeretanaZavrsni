import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import "./AdminKartica.css"
const AdminKartica = () => {
  
  const [korisnici,setKorisnici] = useState([])
  const [broj,setBroj] = useState("");
  const [od,setOd] = useState("");
  const [vaziDo,setDo] = useState("");
  const [broj2,setBroj2] = useState("");
  const [od2,setOd2] = useState("");
  const [vaziDo2,setDo2] = useState("");

  const [filter, setFilter] = useState('');
  const [filteredKorisnici, setFilteredKorisnici] = useState([]);

    useEffect(() => {
       
        fetchData();
      }, []);  
      const fetchData = async () => {
        try {
          const res = await axios.get('http://localhost:8800/api/users');
          setKorisnici(res.data);
          setFilteredKorisnici(res.data)
        } catch (err) {
          console.log(err);
        }
      };
const handleAdd = async (e) =>{
  e.preventDefault()
  try{
    console.log(od)
    console.log(vaziDo)
     const res = await axios.post("http://localhost:8800/api/users/dodaj/novi", {broj,od,vaziDo})
     alert("Uspjesno dodat")
     await fetchData()
     setBroj("");
     setOd("");
     setDo("");
  }catch(err){
    console.log(err)
    alert("Dodavanje nije uspjelo")
  }
};
const handleChange = async (e) =>{
  e.preventDefault()
  try{
    console.log(od)
    console.log(vaziDo)
     const res = await axios.put("http://localhost:8800/api/users/promijeni/novi", {broj2,od2,vaziDo2})
     alert("Uspjesno promjenjen")
     await fetchData()
     setBroj2("");
     setOd2("");
     setDo2("");
  }catch(err){
    console.log(err)
    alert("Promjena nije uspjela")
  }
}
function formatDate(inputDate) {
  const dateObject = new Date(inputDate);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
}
const handleFilterChange = (e) => {
  const keyword = e.target.value.toLowerCase();
  setFilter(keyword); // Postavljamo filter stanje na uneseni keyword

  // Filtriramo korisnike na temelju unesenog keyworda
  const filteredData = korisnici.filter((korisnik) =>
    korisnik.ime.toLowerCase().includes(keyword) ||
    korisnik.prezime.toLowerCase().includes(keyword) ||
    korisnik.broj_kartice.toLowerCase().includes(keyword)
  );

  setFilteredKorisnici(filteredData); // Postavljamo filtrirane korisnike u stanje
};
  return (
    <div className="sadrzaj">
    <h1 className='naslov'>Svi korisnici</h1>
    <div className="forme">
    <form onSubmit={handleAdd}>
      <h1>Dodaj Karticu</h1>
        <input placeholder='Broj Kartice' required type="text" value={broj} onChange={(e) => setBroj(e.target.value)}/>
        <input type="date" required value={od} onChange={(e) => setOd(e.target.value)}/>
        <input type="date" required value={vaziDo} onChange={(e) => setDo(e.target.value)}/>
        <button className='addNew' type='submit'>Dodaj novog korisnika</button>
      </form>
      <form onSubmit={handleChange}>
      <h1>Izmijeni </h1>
        <input placeholder='Broj Kartice' required type="text" value={broj2}  readOnly/>
        <input type="date" required value={od2} onChange={(e) => setOd2(e.target.value)}/>
        <input type="date" required value={vaziDo2} onChange={(e) => setDo2(e.target.value)}/>
        <button className='addNew' type='submit'>Izmijeni korisnika</button>
      </form>
      </div>
      <input type="text" placeholder='filter' onChange={handleFilterChange}/>
     <div className="table-container">
  <table className='korisnici'>
    <thead>
      <tr>
        <th>Id korisnika</th>
        <th>Ime</th>
        <th>Prezime</th>
        <th>Broj kartice</th>
        <th>Clanarina Od</th>
        <th>Clanarina Do</th>
      </tr>
    </thead>
    <tbody>
      {filteredKorisnici.map((korisnik) => (
        <React.Fragment key={korisnik.id}>
          <tr>
          <td className='col'>{korisnik.id}</td>
            <td className='col'>{korisnik.ime}</td>
            <td className='col'>{korisnik.prezime}</td>
            <td className='col'>{korisnik.broj_kartice}</td>
            <td className='col'>{formatDate(korisnik.clanarinaOd)}</td>
            <td className='col'>{formatDate(korisnik.clanarinaDo)}</td>
            <td className='col'><button className='zakazi'  onClick={() => {
              setBroj2(korisnik.broj_kartice);
              setOd2(formatDate(korisnik.clanarinaOd));
              setDo2(formatDate(korisnik.clanarinaDo));
            }}>Izmijeni</button></td>
          </tr>
          
           
        </React.Fragment>
      ))}
    </tbody>
  </table>
  </div>
  </div>
  )
}

export default AdminKartica
