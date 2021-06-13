import { Router } from "express";
import { CreateCourseModuleController } from "../controllers/courseModule/CreateCourseModule";
import { GetCourseModule } from "../controllers/courseModule/GetCourseModule";
import { CourseModule } from "../models/CourseModule";
import { CourseModuleRepository } from "../repositories/CourseModuleRepository";

const router = Router();

const courseModuleRepository = new CourseModuleRepository(CourseModule);

router.post('/', (req, res) => {
    new CreateCourseModuleController(courseModuleRepository).execute(req, res);
})

router.get('/:id', (req, res) => {
    new GetCourseModule(courseModuleRepository).execute(req, res);
})

export { router as courseModuleRouter }