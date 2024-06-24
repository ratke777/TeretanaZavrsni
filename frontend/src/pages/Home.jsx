import React from 'react'
import "./Home.css"
import slika from './slike/terrace1.jpg'
const Home = () => {
  return (
  
      <div className="cont">
        <h1>Dobrodosli na Forestino Gym!</h1>
        <h3>Budite u toku sa najnovijim blogovima!</h3>
        <div className="blokovi">
          <div className="blok">
            <div className="divSlika">
            <img className='slikaBlog' src={slika} alt="" />
            </div>
            <div className='Opis'>
              <h2>Naslov Bloga</h2>
            <p>Harum sunt nisi dolore dolorem ea inventore corrupti reprehenderit incidunt.
Harum corporis dicta.
Est earum et.
Id repellat</p>
            <p>2012/21/12</p>
            <button className='saznaj'>Saznaj vise!</button>
            </div>
          </div>
          <div className="blok">
            <div className="divSlika">
            <img className='slikaBlog' src={slika} alt="" />
            </div>
            <div className='Opis'>
              <h2>Naslov Bloga</h2>
            <p>Harum sunt nisi dolore dolorem ea inventore corrupti reprehenderit incidunt.
Harum corporis dicta.
Est earum et.
Id repellat</p>
            <p>2012/21/12</p>
            <button className='saznaj'>Saznaj vise!</button>
            </div>
          </div>
          <div className="blok">
            <div className="divSlika">
            <img className='slikaBlog' src={slika} alt="" />
            </div>
            <div className='Opis'>
              <h2>Naslov Bloga u krajnosti react node ale</h2>
            <p>Harum sunt nisi dolore dolorem ea inventore corrupti reprehenderit incidunt.
Harum corporis dicta.
Est earum et.
Id repellat</p>
            <p>2012/21/12</p>
            <button className='saznaj'>Saznaj vise!</button>
            </div>
          </div>
          <div className="blok">
            <div className="divSlika">
            <img className='slikaBlog' src={slika} alt="" />
            </div>
            <div className='Opis'>
              <h2>Naslov Bloga</h2>
            <p>Harum sunt nisi dolore dolorem ea inventore corrupti reprehenderit incidunt.
Harum corporis dicta.
Est earum et.
Id repellat</p>
            <p>2012/21/12</p>
            <button className='saznaj'>Saznaj vise!</button>
            </div>
          </div>

        </div>
      </div>

  )
}

export default Home
