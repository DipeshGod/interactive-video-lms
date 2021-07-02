import { Router } from 'express';
import { CreateQuizController } from '../controllers/quiz/CreateQuizController';
import { GetQuizController } from '../controllers/quiz/GetQuizController';
import { Quiz } from '../models/Quiz';
import { QuizRepository } from '../repositories/QuizRepository';

const router = Router();

const quizRepository = new QuizRepository(Quiz);

router.post('/', (req, res) =>
    new CreateQuizController(quizRepository).execute(req, res)
);

router.get('/:id', (req, res) =>
    new GetQuizController(quizRepository).execute(req, res)
);

export { router as quizRouter }