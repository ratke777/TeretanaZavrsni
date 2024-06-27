import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import "./AdminBlog.css"
const AdminBlog = () => {

  const [err,setError] = useState()

  const [inputs,setInputs]= useState({
        naslov:"",
        opis:"",
        date:"",
        tekst:""
      });

    const handleChange = e =>{
        setInputs(prev=>({...prev,[e.target.name]:e.target.value}))
    }
    const [file, setFile] = useState(null);

    const upload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:8800/api/upload", formData);
        return res.data;
      } catch (err) {
        console.log(err);
      }
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const imgUrl = await upload();
  
      try {
              await axios.post("http://localhost:8800/api/posts/dodaj", {
              inputs,
              img: file ? imgUrl : "",
              

            });
           
      } catch (err) {
        console.log(err);
      }
    };
  
    return (
      <div className="rezervacije">
       
      <form onSubmit={handleSubmit}>
      <h1>Dodaj Blog</h1>
        <input type="text" onChange={handleChange} placeholder="Title" name="naslov" />
        <textarea onChange={handleChange} placeholder="Description" name="opis"></textarea>
        <input type="date"  onChange={handleChange} name="date"/>
        <input type="file"  onChange={(e) => setFile(e.target.files[0])} name="slika"/>
        <textarea  onChange={handleChange} placeholder="Text" name="tekst"></textarea>
        <button type="submit">Add Blog</button>
      </form>
      </div>
    );
  };
export default AdminBlog
