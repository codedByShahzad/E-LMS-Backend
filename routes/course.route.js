import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { creteCourse } from "../controllers/course.controller.js";

const router = express.Router()

router.post("/create-course", isAuthenticated, creteCourse)

export default router