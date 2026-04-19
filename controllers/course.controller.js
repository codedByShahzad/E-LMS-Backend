import { Course } from "../models/course.model.js";

export const creteCourse = async (req, res) => {
  try {
    const { courseTitle, category, coursePrice } = req.body;

    if ((!courseTitle, !category, !coursePrice)) {
      return res.status(400).json({
        success: false,
        message: "Course Title, category and course Price are required",
      });
    }

    const course = await Course.create({
      courseTitle,
      category,
      coursePrice,
      creator: req.id,
    });

    return res.status(201).json({
      success: true,
      message: "Course Created Successfully",
      course,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to create course",
    });
  }
};

export const getAllCourses = async (req, res) => {
  try {

    const userId = req.id

    const courses = await Course.find({creator:userId})

    if (!courses) {
        return res.status(404).json({
            course: [],
            message: "Courses not found"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Courses found successfully",
        courses
    })

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "Failed to get all courses",
    });
  }
};
