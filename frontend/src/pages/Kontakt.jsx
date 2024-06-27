import React from 'react'
import "./Kontakt.css"
import Swal from 'sweetalert2'

const Kontakt = () => {


  const [result, setResult] = React.useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "e947c027-e1d6-4601-b0c9-a486a36abfc8");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (data.success) {
      Swal.fire({
        title: "Sjajno!",
        text: "Vasa poruka je poslata!",
        icon: "success"
      });
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };


  return (
    //e947c027-e1d6-4601-b0c9-a486a36abfc8
    
    <div className='contact'>
      
      <form onSubmit={onSubmit} >
      <h1 className='naslov'>Kontakt</h1>
        <div className="input-box">
          <label >Ime i prezime</label>
          <input required type="text" name="name"className='field' placeholder='Unesite svoje ime i prezime' />
        </div>
        <div className="input-box">
          <label >Email adresa</label>
          <input required type="text" name="email" className='field' placeholder='Unesite email adresu' />
        </div>
        <div className="input-box">
          <label >Vasa poruka</label>
          <textarea required name="message" id="" className='field mess' placeholder='Unesite vasu poruku'></textarea>
        </div>
        <button type="submit">Posalji poruku</button>
      </form>
      
    </div>
  )
}

export default Kontakt
