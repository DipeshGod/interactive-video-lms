import { Router } from 'express';
import { UploadCourseModuleController } from '../controllers/courseModule/upload/UploadModuleVideoController';
import { Course } from '../models/Course';
import { CourseModule } from '../models/CourseModule';
import { CourseModuleRepository } from '../repositories/CourseModuleRepository';
import { CourseRepository } from '../repositories/CourseRepository';
import { IntroUploadController } from './../controllers/course/upload/IntroUploadController';

const router = Router();

const courseModuleRepository = new CourseModuleRepository(CourseModule);
const courseRepository = new CourseRepository(Course);

router.post('/course/intro', (req, res) =>
  new IntroUploadController(courseRepository).execute(req, res)
);

router.post('/course-module/video', (req, res) => {
  new UploadCourseModuleController(courseModuleRepository).execute(req, res)
})


export { router as uploadRouter };
