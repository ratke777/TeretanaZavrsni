import express from "express"
import postRoutes from "./routes/posts.js"
import authRoutes from "./routes/auth.js"
//import userRoutes from "./routes/users.js"
import cors from 'cors'
import cookieParser from "cookie-parser"
import userRoutes from "./routes/users.js"
import terminRoutes from "./routes/Termini.js"
import multer from "multer"

const app = express()
app.use(cors())
app.use(cookieParser())
app.use(express.json())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../frontend/public/upload")
    },
    filename: function (req, file, cb) {
      
      cb(null, Date.now()+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })
app.post("/api/upload",upload.single("file"),function(req,res){
    const file = req.file;
    return res.status(200).json(file.filename)
    
})
  
app.use("/api/posts" , postRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/termini",terminRoutes)

app.listen(8800,()=>{
    console.log("Connected")
})