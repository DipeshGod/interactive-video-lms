import { Router } from "express";
import { UploadCourseModuleController } from "../controllers/upload/UploadModuleVideoController";
import { NotePictureUploadController } from "../controllers/upload/NotePictureController";
import { authentication } from "../middleware/authenticate";
import { Course } from "../models/Course";
import { CourseModule } from "../models/CourseModule";
import { CourseModuleRepository } from "../repositories/CourseModuleRepository";
import { CourseRepository } from "../repositories/CourseRepository";
import { IntroUploadController } from "../controllers/upload/IntroUploadController";

const router = Router();

const courseModuleRepository = new CourseModuleRepository(CourseModule);
const courseRepository = new CourseRepository(Course);

router.post("/course/intro", authentication, (req, res) =>
  new IntroUploadController(courseRepository).execute(req, res)
);

router.post("/course-module/video", authentication, (req, res) => {
  new UploadCourseModuleController(courseModuleRepository).execute(req, res);
});

router.post("/course/picture", authentication, (req, res) => {
  new NotePictureUploadController().execute(req, res);
});

router.post("/user/profile", authentication, (req, res) => {});

export { router as uploadRouter };
