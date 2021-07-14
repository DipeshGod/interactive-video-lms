import { Router } from "express";
import { CreateUserEnrolledController } from "../controllers/userEnrolled/CreateUserEnrolledController";
import { DeleteUserEnrolledController } from "../controllers/userEnrolled/DeleteUserEnrolledController";
import { EditUserEnrolledController } from "../controllers/userEnrolled/EditUserEnrolledController";
import { GetUserEnrolledController } from "../controllers/userEnrolled/GetUserEnrolledController";
import { UserEnrolled } from "../models/UserEnrolled";
import { UserEnrolledRepository } from "../repositories/UserEnrolledRepository";

const router = Router();

const userEnrolledRepository = new UserEnrolledRepository(UserEnrolled);

router.post('/', (req, res) =>
    new CreateUserEnrolledController(userEnrolledRepository).execute(req, res)
);

router.get('/:id', (req, res) =>
    new GetUserEnrolledController(userEnrolledRepository).execute(req, res)
);

router.put('/:id', (req, res) =>
    new EditUserEnrolledController(userEnrolledRepository).execute(req, res)
);

router.delete('/:id', (req, res) =>
    new DeleteUserEnrolledController(userEnrolledRepository).execute(req, res)
);

export { router as userEnrolledRouter }