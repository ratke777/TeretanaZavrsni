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


  
app.use("/api/posts" , postRoutes)
app.use("/api/auth",authRoutes)
app.use("/api/users",userRoutes)
app.use("/api/termini",terminRoutes)

app.listen(8800,()=>{
    console.log("Connected")
})