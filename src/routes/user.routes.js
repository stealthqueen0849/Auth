import { Router } from "express";


const router = Router()

router.route("/signup").post(signUp)
router.route("/login").post(login)
router.route("/logout").post(logout)



export default router;