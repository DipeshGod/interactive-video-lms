import { Router } from "express";
import { CreateCourseModuleController } from "../controllers/courseModule/CreateCourseModule";
import { CourseModule } from "../models/CourseModule";
import { CourseModuleRepository } from "../repositories/CourseModuleRepository";

const router = Router();

const courseModuleRepository = new CourseModuleRepository(CourseModule);

router.post('/', (req, res) => {
    new CreateCourseModuleController(courseModuleRepository).execute(req, res);
})

export { router as courseModuleRouter }