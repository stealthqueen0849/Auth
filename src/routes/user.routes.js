import { Router } from "express";
import {signup, login, logout} from "../controllers/user.controllers.js"
const router = Router()

router.route("/signup").post(signup)
router.route("/login").post(login)
router.route("/logout").get(logout)

export default router;