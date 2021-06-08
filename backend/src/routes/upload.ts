import { Router } from 'express';
import { VideoUploadController } from '../controllers/course/courseModule/upload/VideoUploadController';
import { Course } from '../models/Course';
import { CourseModule } from '../models/CourseModule';
import { CourseModuleRepository } from '../repositories/CourseModuleRepository';
import { CourseRepository } from '../repositories/CourseRepository';
import { IntroUploadController } from './../controllers/course/upload/IntroUploadController';

const router = Router();

const courseModuleRepository = new CourseModuleRepository(CourseModule);
const courseRepository = new CourseRepository(Course);

router.post('/course/video', (req, res) =>
  new VideoUploadController(courseModuleRepository).execute(req, res)
);

router.post('/course/intro', (req, res) =>
  new IntroUploadController(courseRepository).execute(req,res)
);



export { router as uploadRouter };
