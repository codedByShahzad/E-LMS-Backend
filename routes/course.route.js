import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { creteCourse, getAllCourses } from "../controllers/course.controller.js";

const router = express.Router()

router.post("/create-course", isAuthenticated, creteCourse)
router.get("/all-courses", isAuthenticated, getAllCourses)

export default router