import {db} from "../db.js"



  
  export const addPost = (req, res) => {
      const q = "Insert into blog(naslov,opis,slika,date,tekst) values  (?)";
      const values =[
        req.body.title,
        req.body.dec,
        req.body.img,
        req.body.date,
        req.body.text
      ]
      db.query(q,[values],(err,data)=>{
        if(err) return res.status(500).json('Greska s bazom!')
        return res.status(200).json("Post has been created")
      })
     
  };


export const allPosts = (req,res)=>{

    const q = "Select* from blog order by date DESC"

    db.query(q,[],(err,data)=>{
        if(err) return res.status(505).json("Greska u bazi")
          
        return res.status(200).json(data)
    })



}

export const single = (req, res) => {
  const q = "SELECT* FROM blog where id_bloga = ?"
  db.query(q,[req.params.id],(err,data)=>{
      //console.log(req.params.id)
      
      
      if (err) return res.send(err)
      return res.status(200).json(data[0])
  })
};

  
export const updatePost = (req, res) => {
  const postId=req.params.id
  const q = "UPDATE blog \
SET naslov = ?, opis = ?, slika = ?, date = ?, tekst = ? \
WHERE id_bloga = ?";
  const values =[
    req.body.title,
    req.body.dec,
    req.body.img,
    req.body.date,
    req.body.text
  ]
  db.query(q,[...values,postId],(err,data)=>{
    if(err) return res.status(500).json('Greska s bazom!')
    return res.status(200).json("Post has been updated")
  })
 
};

export const delPost = (req,res)=>{

    const q = "Delete from blog where id_bloga = ?"
    db.query(q,[req.params.id],(err,data)=>{

    
      if(err) return res.json(err)
      return res.status(505).json("Uspjesno IZbrisano")
    
    
  })

};