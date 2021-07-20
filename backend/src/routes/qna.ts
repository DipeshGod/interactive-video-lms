import { Router } from 'express';
import { CreateQNAController } from '../controllers/QNA/CreateQNAController';
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

export { router as QNARouter };
