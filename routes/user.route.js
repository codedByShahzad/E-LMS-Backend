import express from "express"
import { login, register } from "../controllers/user.controller.js"
import { isAuthenticated } from "../middlewares/isAuthenticated.js"

const router = express.Router()

router.post("/register",register)
router.post("/login",login)
router.get("/profile", isAuthenticated)

export default router;