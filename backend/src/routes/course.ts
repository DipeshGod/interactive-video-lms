import { Router } from 'express';
import { CreateCourseController } from '../controllers/course/CreateCourseController';
import { DeleteCourseController } from '../controllers/course/DeleteCourseController';
import { EditCourseController } from '../controllers/course/EditCourseController';
import { GetCourseByIdController } from '../controllers/course/GetCourseByIdController';
import { GetCourseController } from '../controllers/course/GetCourseController';
import { CreateReviewController } from '../controllers/course/review/CreateReviewController';
import { Course } from '../models/Course';
import { CourseModule } from '../models/CourseModule';
import { CourseRepository } from '../repositories/CourseRepository';

const router = Router();

const courseRepository = new CourseRepository(Course);

//course routes
/* Get all course */
router.get('/', (req, res) =>
  new GetCourseController(courseRepository).execute(req, res)
);

/* Create a new course */
router.post('/', (req, res) =>
  new CreateCourseController(courseRepository).execute(req, res)
);

/* Get Course by id */
router.get('/:id', (req, res) =>
  new GetCourseByIdController(courseRepository).execute(req, res)
);

/* Edit course infromation route */
router.put('/:id', (req, res) =>
  new EditCourseController(courseRepository).execute(req, res)
)

/* Delete Course */
router.delete('/:id', (req, res) =>
  new DeleteCourseController(courseRepository).execute(req, res)
);

router.put('/review/:id', (req, res) =>
  new CreateReviewController(courseRepository).execute(req, res)
);

export { router as courseRouter };
