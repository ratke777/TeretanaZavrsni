import express from "express"
import { clanarina,rezervacije } from "../controllers/user.js";

const router = express.Router()

router.get("/:id", clanarina);
router.get("/rezervacije/:id",rezervacije)


export default router