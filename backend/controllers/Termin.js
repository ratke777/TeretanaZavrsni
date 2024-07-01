import {db} from "../db.js"

export const termini = (req,res)=>{
    const q ="SELECT * FROM termin te JOIN trening t ON t.id_treninga = te.id_treninga  WHERE te.vrijeme > NOW()  AND te.vrijeme < DATE_ADD(NOW(), INTERVAL 3 DAY) and te.id_termina not in(SELECT ter.id_termina from trening t  \
      inner join termin as ter ON t.id_treninga = ter.id_treninga \
      inner join rezervacije as r ON r.id_termina=ter.id_termina \
      inner join users as u on r.id_usera = u.id \
      where u.id =? );  "

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.json(err)
        return res.status(200).json(data)
    })


}
export const addTermin = (req, res) => {
  const q = "INSERT INTO termin (vrijeme, id_treninga) VALUES (?, ?)";
  console.log(req.body.satnica);

  db.query(q, [req.body.satnica, req.body.id_treninga], (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json("Greska s bazom!");
    }

    if (data.affectedRows > 0) {
      console.log("uspjesno");
      return res.status(200).json("Uspješno dodat termin");
    } else {
      console.log("Neuspjesno");
      return res.status(400).json("Neuspješno dodat termin");
    }
  });
};
export const treninzi = (req,res)=>{
  const q = "Select* from trening where aktivan = 'da' "
  db.query(q,[],(err,data)=>{
    if(err) return res.json("Greska s bazom")
    return res.status(200).json(data)
  });
};
export const delTermin = (req,res)=>{
  const q = "Delete from termin where id_termina = ?";
  db.query(q,[req.params.id],(err,data)=>{
    if(err) console.error(err)
    return res.status(200).json("Uspjesno obrisan")
  })
}
export const delTrening = (req,res)=>{
  const q = "UPDATE trening \
  SET aktivan = 'ne' \
  where id_treninga = ?";
  db.query(q,[req.params.id],(err,data)=>{
    console.log(req.params.id)
    if(err) console.error(err)
    return res.status(200).json("Uspjesno obrisan")
  })
};
export const addTrening = (req, res) => {
  const q = "INSERT INTO trening (ime_treninga,ime_trenera,opis_treninga) VALUES (?, ?, ?)";
  

  db.query(q, [req.body.ime_treninga, req.body.ime_trenera,req.body.opis_treninga], (err, data) => {
    if (err) {
      console.error(err); 
      return res.status(500).json("Greska s bazom!");
    }

    if (data.affectedRows > 0) {
      console.log("uspjesno");
      return res.status(200).json("Uspješno dodat trening");
    } else {
      console.log("Neuspjesno");
      return res.status(400).json("Neuspješno dodat trening");
    }
  });
};

export const rezervisi = (req, res) => {
  const values = [
      req.body.id_usera,
      req.body.id_termina
    
  ]
  console.log(values)
  const q2 = 'SELECT * FROM rezervacije WHERE id_usera = ? AND id_termina = ?';
  db.query(q2, [req.body.id_usera, req.body.id_termina], (err, data) => {

    if (err) return res.json(err);
    if (data.length) return res.status(403).json('Korisnik je već zakazao ovaj termin');
   console.log("nema zakazanih")
    const q = 'INSERT INTO rezervacije(id_usera, id_termina) VALUES (?, ?)';
    db.query(q, [req.body.id_usera, req.body.id_termina], (err, data) => {
      if (err) return res.json(err);

      return res.status(200).json('Zakazano');
    });
  });
};

export const izbrisiRez = (req,res) =>{
  
    const id = req.params.id;
  
    const q = "DELETE FROM rezervacije where id_rezervacije  = ?"

    db.query(q,[id],(err,data)=>{
      if(err) return res.json(err)
      return res.status(200).json("Uspjesno")
    });

};

export const korisniciTermini = (req,res) =>{
   
  const q = "Select u.id,u.ime,u.prezime,t.id_termina from users u\
     join rezervacije r on r.id_usera = u.id \
     join termin t ON t.id_termina=r.id_termina";

  db.query(q,[],(err,data)=>{
     if(err) return res.json(err)

      return res.status(201).json(data)
  });

};