import { Router } from "express";
import { CreateUserEnrolledController } from "../controllers/userEnrolled/CreateUserEnrolledController";
import { DeleteUserEnrolledController } from "../controllers/userEnrolled/DeleteUserEnrolledController";
import { EditUserEnrolledController } from "../controllers/userEnrolled/EditUserEnrolledController";
import { GetUserEnrolledController } from "../controllers/userEnrolled/GetUserEnrolledController";
import { UserEnrolled } from "../models/UserEnrolled";
import { StudentProgress, ModuleProgress } from "./../models/Progress";
import { ProgressRepository } from "../repositories/ProgressRepository";
import { UserEnrolledRepository } from "../repositories/UserEnrolledRepository";
import { CourseModuleRepository } from "../repositories/CourseModuleRepository";
import { CourseModule } from "../models/CourseModule";

const router = Router();

const userEnrolledRepository = new UserEnrolledRepository(UserEnrolled);
const progressRepository = new ProgressRepository(
  StudentProgress,
  ModuleProgress
);
const courseModuleRepository = new CourseModuleRepository(CourseModule);

router.post("/", (req, res) =>
  new CreateUserEnrolledController(
    userEnrolledRepository,
    progressRepository,
    courseModuleRepository
  ).execute(req, res)
);

router.get("/:id", (req, res) =>
  new GetUserEnrolledController(userEnrolledRepository).execute(req, res)
);

router.put("/:id", (req, res) =>
  new EditUserEnrolledController(userEnrolledRepository).execute(req, res)
);

router.delete("/:id", (req, res) =>
  new DeleteUserEnrolledController(userEnrolledRepository).execute(req, res)
);

export { router as userEnrolledRouter };
