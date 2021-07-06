import { Router } from 'express';
import { CreateExerciseController } from '../controllers/exercise/CreateExerciseController';
import { DeleteExerciseController } from '../controllers/exercise/DeleteExerciseController';
import { EditExerciseController } from '../controllers/exercise/EditExerciseController';
import { GetExerciseController } from '../controllers/exercise/GetExerciseController';
import { CourseModule } from '../models/CourseModule';
import { Exercise } from '../models/Exercise';
import { CourseModuleRepository } from '../repositories/CourseModuleRepository';
import { ExerciseRepository } from '../repositories/ExerciseRepository';
import { authentication } from '../middleware/authenticate';

const router = Router();

const exerciseRepository = new ExerciseRepository(Exercise);
const courseModuleRepository = new CourseModuleRepository(CourseModule);

router.post('/', authentication, (req, res) =>
    new CreateExerciseController(exerciseRepository, courseModuleRepository).execute(req, res)
);

router.get('/:id', (req, res) =>
    new GetExerciseController(exerciseRepository).execute(req, res)
);

router.delete('/:id', authentication, (req, res) =>
    new DeleteExerciseController(exerciseRepository).execute(req, res)
);

router.put('/:id', authentication, (req, res) =>
    new EditExerciseController(exerciseRepository).execute(req, res)
);

export { router as exerciseRouter }