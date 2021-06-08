import { Router } from 'express';
import { GetUserController } from '../controllers/user/GetUserController';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

const router = Router();

const userRepository = new UserRepository(User);

router.get('/', (req, res) =>
    new GetUserController(userRepository).execute(req, res)
);

export { router as userRouter };