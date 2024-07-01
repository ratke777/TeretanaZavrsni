import express from "express"
import {termini,addTermin, treninzi,delTermin,delTrening,addTrening,rezervisi,izbrisiRez,korisniciTermini} from "../controllers/Termin.js"

const router = express.Router()
router.get("/trening",treninzi)
router.post("/dodaj/termin",addTermin)
router.get("/:id",termini)
router.delete("/del/:id",delTermin)
router.put("/del/trening/:id",delTrening)
router.post("/dodaj/trening",addTrening)
router.post("/rezervisi",rezervisi)
router.delete("/izbrisi/:id",izbrisiRez)
router.get("/izlistaj/svikorisnici",korisniciTermini)

export default router