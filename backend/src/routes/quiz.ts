import { Router } from 'express';
import { CreateQuizController } from '../controllers/quiz/CreateQuizController';
import { Quiz } from '../models/Quiz';
import { QuizRepository } from '../repositories/QuizRepository';

const router = Router();

const quizRepository = new QuizRepository(Quiz);

router.post('/',(req,res)=>
    new CreateQuizController(quizRepository).execute(req,res)
);