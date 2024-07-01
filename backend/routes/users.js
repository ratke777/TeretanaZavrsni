import express from "express"
import { clanarina,rezervacije,korisnici ,addUser,changeUser,Infokorisnici} from "../controllers/user.js";
import { BsInfoLg } from "react-icons/bs";

const router = express.Router()

router.get("/:id", clanarina);
router.get("/rezervacije/:id",rezervacije);
router.get("/",korisnici);
router.post("/dodaj/novi",addUser);
router.put("/promijeni/novi",changeUser);
router.get("/info/korisnici/:id",Infokorisnici)
export default router