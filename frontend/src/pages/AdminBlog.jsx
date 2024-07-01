import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./AdminBlog.css"
import { useLoaderData ,useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import moment from "moment"
import Swal from "sweetalert2"
const AdminBlog = () => {

  const [err,setError] = useState()

  const state = useLocation().state
  console.log(state?state.slika: "Nema niceg")
  const navigate = useNavigate()
  const [title,setTitle] = useState(state?.naslov || "");
  const [dec,setDec] = useState(state?.opis || "");
  const [file,setFile] = useState(null)
  const [text,setText] = useState(state?.tekst || "")
  const [date,setDate] = useState(state?.date || "");
  
 

    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:8800/api/upload", formData);
        return res.data
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const imgUrl = await upload()
      try{
          state ? await axios.put(`http://localhost:8800/api/posts/edit/${state.id_bloga}`,
          {title,dec,text,date:moment(Date.now()).format("YYYY-MM-DD"),img: file ? imgUrl : ""}
        )
        : await axios.post(`http://localhost:8800/api/posts/dodaj`,
          {title,dec,text,date:moment(Date.now()).format("YYYY-MM-DD hh-mm"),img: file ? imgUrl : ""}
        )
        Swal.fire({
          title: "Sjajno!",
          text: "Vas blog je kreiran!",
          icon: "success"
        });
        navigate("/")
        
      }catch(err){
        console.log(err);
      }
    };
  
    return (
      <div className="rezervacije">
       
      <form onSubmit={handleSubmit}>
      <h1>Dodaj Blog</h1>
        <input required type="text" value={title} placeholder="Title" name="title" onChange={e=>setTitle(e.target.value)}/>
        <textarea required value={dec}onChange={e=>setDec(e.target.value)} placeholder="Description" name="opis"></textarea>
        
        <input required type="file"  onChange={(e) => setFile(e.target.files[0])} name="file"/>
        <textarea  required value={text }onChange={e=>setText(e.target.value)} placeholder="Text" name="tekst"></textarea>
        <button type="submit">Add Blog</button>
      </form>
      </div>
    );
  };
export default AdminBlog
