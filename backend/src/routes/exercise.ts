import { Router } from 'express';
import { CreateExerciseController } from '../controllers/exercise/CreateExerciseController';
import { GetExerciseController } from '../controllers/exercise/GetExerciseController';
import { Exercise } from '../models/Exercise';
import { ExerciseRepository } from '../repositories/ExerciseRepository';

const router = Router();

const exerciseRepository = new ExerciseRepository(Exercise);

router.post('/', (req, res) =>
    new CreateExerciseController(exerciseRepository).execute(req, res)
);

router.get('/:id', (req, res) =>
    new GetExerciseController(exerciseRepository).execute(req, res)
);

export { router as exerciseRouter }