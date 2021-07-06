import { Router } from 'express';
import { CreateCourseController } from '../controllers/course/CreateCourseController';
import { DeleteCourseController } from '../controllers/course/DeleteCourseController';
import { EditCourseController } from '../controllers/course/EditCourseController';
import { GetCourseByIdController } from '../controllers/course/GetCourseByIdController';
import { GetCourseController } from '../controllers/course/GetCourseController';
import { isSuperAdmin, isEnterprise, isStudent } from '../middleware/authorization';
import { Course } from '../models/Course';
import { CourseRepository } from '../repositories/CourseRepository';
import { authentication } from './../middleware/authenticate';

const router = Router();

const courseRepository = new CourseRepository(Course);

//course routes
/* Get all course */
router.get('/', (req, res) =>
  new GetCourseController(courseRepository).execute(req, res)
);

/* Create a new course */
router.post('/', authentication, (req, res) =>
  new CreateCourseController(courseRepository).execute(req, res)
);

/* Get Course by id */
router.get('/:id', (req, res) =>
  new GetCourseByIdController(courseRepository).execute(req, res)
);

/* Edit course infromation route */
router.put('/:id', authentication, (req, res) =>
  new EditCourseController(courseRepository).execute(req, res)
)

/* Delete Course */
router.delete('/:id', authentication, (req, res) =>
  new DeleteCourseController(courseRepository).execute(req, res)
);

export { router as courseRouter };
