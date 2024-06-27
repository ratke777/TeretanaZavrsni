import express from "express"
import {termini} from "../controllers/Termin.js"

const router = express.Router()
router.get("/:id",termini)

export default router