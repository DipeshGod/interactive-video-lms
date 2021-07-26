import { Router } from 'express';
import { AddAnswerController } from '../controllers/QNA/AddAnswerController';
import { CreateQNAController } from '../controllers/QNA/CreateQNAController';
import { GetQNAByIdController } from '../controllers/QNA/GetQNAByIdController';
import { GetQNAController } from '../controllers/QNA/GetQNAController';
import { QNA } from '../models/QNA';
import { QNARepository } from '../repositories/QNARepository';

const router = Router();

const qnaRepository = new QNARepository(QNA);

router.post('/', (req, res) =>
  new CreateQNAController(qnaRepository).execute(req, res)
);

router.get('/:id', (req, res) =>
  new GetQNAController(qnaRepository).execute(req, res)
);

router.get('/qnaById/:id', (req, res) =>
  new GetQNAByIdController(qnaRepository).execute(req, res)
);

router.put('/answer/:id', (req, res) =>
  new AddAnswerController(qnaRepository).execute(req, res)
);

export { router as QNARouter };
