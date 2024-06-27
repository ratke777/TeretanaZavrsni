import express from "express"
import {termini,addTermin, treninzi,delTermin,delTrening,addTrening} from "../controllers/Termin.js"

const router = express.Router()
router.get("/trening",treninzi)
router.post("/dodaj/termin",addTermin)
router.get("/:id",termini)
router.delete("/del/:id",delTermin)
router.delete("/deltrening/:id",delTrening)
router.post("/dodaj/trening",addTrening)


export default router