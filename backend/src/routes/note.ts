import { Router } from "express";
import { CreateNoteController } from "../controllers/note/CreateNoteController";
import { GetNoteByIdController } from "../controllers/note/GetNoteByIdController";
import { GetNoteController } from "../controllers/note/GetNoteController";
import { authentication } from "../middleware/authenticate";
import { Note } from "../models/Note";
import { NoteRepository } from "../repositories/NoteRepository";

const router = Router();

const noteRepository = new NoteRepository(Note);

router.post("/", authentication, (req, res) =>
  new CreateNoteController(noteRepository).execute(req, res)
);

router.get("/:id", (req, res) =>
  new GetNoteController(noteRepository).execute(req, res)
);

router.get("/noteById/:id", (req, res) =>
  new GetNoteByIdController(noteRepository).execute(req, res)
);

export { router as noteRouter };
