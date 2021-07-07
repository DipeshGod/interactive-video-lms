import { Router } from "express";
import { CreateCourseModuleController } from "../controllers/courseModule/CreateCourseModuleController";
import { DeleteCourseModuleController } from "../controllers/courseModule/DeleteCourseModuleController";
import { EditCourseModuleController } from "../controllers/courseModule/EditCourseModuleController";
import { GetCourseModule } from "../controllers/courseModule/GetCourseModuleController";
import { CourseModule } from "../models/CourseModule";
import { CourseModuleRepository } from "../repositories/CourseModuleRepository";
import { authentication } from "../middleware/authenticate";
import { GetCourseByIdController } from "../controllers/course/GetCourseByIdController";
import { GetCourseModuleByIDController } from "../controllers/courseModule/GetCourseModuleByIDController";

const router = Router();

const courseModuleRepository = new CourseModuleRepository(CourseModule);

router.post('/', authentication, (req, res) =>
    new CreateCourseModuleController(courseModuleRepository).execute(req, res)
);

/* Course ID */
router.get('/:id', (req, res) =>
    new GetCourseModule(courseModuleRepository).execute(req, res)
);

router.put('/:id', authentication, (req, res) =>
    new EditCourseModuleController(courseModuleRepository).execute(req, res)
);

router.delete('/:id', authentication, (req, res) =>
    new DeleteCourseModuleController(courseModuleRepository).execute(req, res)
);

router.get('/module/:id', (req, res) =>
    new GetCourseModuleByIDController(courseModuleRepository).execute(req, res)
);



export { router as courseModuleRouter }