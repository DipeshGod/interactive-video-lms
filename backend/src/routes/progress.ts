import { Router } from "express";
import { CreateProgressController } from "../controllers/progress/CreateProgressController";
import { DeleteProgressController } from "../controllers/progress/DeleteProgressController";
import { EditProgressController } from "../controllers/progress/EditProgressController";
import { GetProgressController } from "../controllers/progress/GetProgressController";
import { StudentProgress } from "../models/Progress";
import { UserEnrolled } from "./../models/UserEnrolled";
import { ProgressRepository } from "../repositories/ProgressRepository";
import { UserEnrolledRepository } from "./../repositories/UserEnrolledRepository";

const router = Router();

const progressRepository = new ProgressRepository(StudentProgress);
const userEnrolledRepository = new UserEnrolledRepository(UserEnrolled);

router.post("/", (req, res) =>
  new CreateProgressController(progressRepository).execute(req, res)
);

router.get("/", (req, res) =>
  new GetProgressController(progressRepository).execute(req, res)
);

router.put("/", (req, res) =>
  new EditProgressController(
    progressRepository,
    userEnrolledRepository
  ).execute(req, res)
);

router.delete("/:id", (req, res) =>
  new DeleteProgressController(progressRepository).execute(req, res)
);

export { router as progressRouter };
