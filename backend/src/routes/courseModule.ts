import { Router } from "express";
import { CreateCourseModuleController } from "../controllers/courseModule/CreateCourseModuleController";
import { DeleteCourseModuleController } from "../controllers/courseModule/DeleteCourseModuleController";
import { EditCourseModuleController } from "../controllers/courseModule/EditCourseModuleController";
import { GetCourseModule } from "../controllers/courseModule/GetCourseModuleController";
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

router.put('/:id', (req, res) => {
    new EditCourseModuleController(courseModuleRepository).execute(req, res);
})

router.delete('/:id', (req, res) => {
    new DeleteCourseModuleController(courseModuleRepository).execute(req, res);
})

export { router as courseModuleRouter }