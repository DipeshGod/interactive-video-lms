import { Router } from "express";
import { CreateProgressController } from "../controllers/progress/CreateProgressController";
import { DeleteProgressController } from "../controllers/progress/DeleteProgressController";
import { EditProgressController } from "../controllers/progress/EditProgressController";
import { GetProgressController } from "../controllers/progress/GetProgressController";
import { ModuleProgress, StudentProgress } from "../models/Progress";
import { ProgressRepository } from "../repositories/ProgressRepository";

const router = Router();

const progressRepository = new ProgressRepository(
  StudentProgress,
  ModuleProgress
);

router.post("/", (req, res) =>
  new CreateProgressController(progressRepository).execute(req, res)
);

router.get("/", (req, res) =>
  new GetProgressController(progressRepository).execute(req, res)
);

router.put("/", (req, res) =>
  new EditProgressController(progressRepository).execute(req, res)
);

router.delete("/:id", (req, res) =>
  new DeleteProgressController(progressRepository).execute(req, res)
);

export { router as progressRouter };
