import express from "express"
import { clanarina,rezervacije,korisnici } from "../controllers/user.js";

const router = express.Router()

router.get("/:id", clanarina);
router.get("/rezervacije/:id",rezervacije)
router.get("/",korisnici)


export default router