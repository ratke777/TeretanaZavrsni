import {db} from "../db.js"



  
  export const addPost = (req, res) => {
 
     
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