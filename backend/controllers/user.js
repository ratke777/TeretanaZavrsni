import {db} from "../db.js"


export const clanarina = (req,res)=>{
 
    const q = "Select* from clanarina where broj_kartice = ?"

    db.query(q,[req.params.id],(err,data)=>{
        if(err) return res.status(500).json("Greska s bazom!")

        return res.status(200).json(data[0])
    })

};
export const rezervacije = (req,res)=>{
    const q = "SELECT r.id_rezervacije,t.id_treninga,t.ime_treninga,t.ime_trenera,ter.vrijeme from trening t \
     inner join termin as ter ON t.id_treninga = ter.id_treninga \
     inner join rezervacije as r ON r.id_termina=ter.id_termina \
     inner join users as u ON u.id = r.id_usera \
     where u.id = ? \
     ORDER BY ter.vrijeme ASC;"

  db.query(q,[req.params.id],(err,data)=>{
      if(err) return res.json(err)
      return res.status(200).json(data)
  })
}