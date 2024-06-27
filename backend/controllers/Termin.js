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