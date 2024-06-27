import express from "express"
import { addPost,allPosts,single,updatePost,delPost } from "../controllers/post.js"

const router = express.Router()

router.post("/dodaj", addPost)
router.get("/",allPosts)
router.get("/:id",single)
router.put("/edit/:id", updatePost)
router.delete("/del/:id",delPost)

export default router