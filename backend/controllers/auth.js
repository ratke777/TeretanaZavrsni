import {db} from"../db.js"
import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
export const register = (req,res)=>{

    const q = "Select* from users where username=? or broj_kartice=?"
    db.query(q, [req.body.username,req.body.broj],(err,data)=>{
        if(err) return res.json(err)
        if(data.length) return res.status(409).json({message: "User has already exists"})    
        const q2 = "Select* from clanarina where broj_kartice=?"
        db.query(q2,[req.body.broj],(err2,data2)=>{
            if (err2) return res.status(500).json({ message: "Database error", error: err2 });
            if (data2.length === 0) return res.status(408).json({ message: "Kartica ne postoji u sistemu" });
        
    



        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        
        const values = [
            req.body.ime,
            req.body.prezime,
            req.body.username,
            hash,
            req.body.broj
           
        ]
        const q = "Insert into users(ime,prezime,username,password,broj_kartice)Values(?)"
      db.query(q,[values],(err,data)=>{
        if (err) return res.json(err);
        return res.status(200).json("User has been created")
      })  ;
    })
    });

}


export const login = (req,res)=>{

    const q = "SELECT* FROM users where username = ? "
    db.query(q,[req.body.username,req.body.password],(err,data)=>{
    if(err) return res.status(502).json({ message: "Database error"});
    if(data.length===0) return res.status(400).json({message:"Greska pri unosu username-a ili passworda"})
    
    const isCorrect = bcrypt.compareSync(req.body.password,data[0].password)
    if(!isCorrect) return res.status(401).json({message:"Greska pri unosu username-a ili passworda"})
    
    const token = jwt.sign({id:data[0].id},"KljucZaEenkripciju");
    const{password,...other} = data[0];
    res.cookie("acces_token",token,{
        httpOnly:true
    }).status(200).json(other)
    console.log(token)






    })
    

}


export const logout = (req , res )=>{

    res.clearCookie("access_token",{
        sameSite:"none",
        secure:true
    }).status(200).json("User has been logged out")

};

