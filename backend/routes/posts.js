import express from "express"
import { addPost,allPosts,single } from "../controllers/post.js"

const router = express.Router()

router.get("/dodaj", addPost)
router.get("/",allPosts)
router.get("/:id",single)

export default router