import { Router } from 'express';
import { DeleteUserController } from '../controllers/user/DeleteUserController';
import { EditUserInfoController } from '../controllers/user/EditUserInfoController';
import { EditUserPasswordController } from '../controllers/user/EditUserPasswordController';
import { GetUserByIdController } from '../controllers/user/GetUserByIDController';
import { GetUserController } from '../controllers/user/GetUserController';
import { GetUserEnrolledCourseController } from '../controllers/user/GetUserEnrolledCoursesController';
import { authentication } from '../middleware/authenticate';
import { User } from '../models/User';
import { UserRepository } from '../repositories/UserRepository';

const router = Router();

const userRepository = new UserRepository(User);

router.get('/', (req, res) =>
    new GetUserController(userRepository).execute(req, res)
);

router.put('/change-password/:id', (req, res) => {
    new EditUserPasswordController(userRepository).execute(req, res)
});

router.get('/enrolled-courses/:id', (req, res) => {
    new GetUserEnrolledCourseController(userRepository).execute(req, res)
});


router.get('/:id', (req, res) => {
    new GetUserByIdController(userRepository).execute(req, res)
});

router.put('/:id', authentication, (req, res) => {
    new EditUserInfoController(userRepository).execute(req, res)
})

router.delete('/:id', authentication, (req, res) => {
    new DeleteUserController(userRepository).execute(req, res)
});


export { router as userRouter };