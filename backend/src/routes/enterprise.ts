import { Router } from 'express';
import { CreateEnterpriseController } from '../controllers/enterprise/CreateEnterpriseController';
import { DeleteEnterpriseController } from '../controllers/enterprise/DeleteEnterpriseController';
import { EditEnterpriseController } from '../controllers/enterprise/EditEnterpriseController';
import { GetEnterpriseController } from '../controllers/enterprise/GetEnterpriseController';
import { Enterprise } from '../models/Enterprise';
import { EnterpriseRepository } from '../repositories/EnterpriseRepository';

const router = Router();

const enterpriseRepository = new EnterpriseRepository(Enterprise);

router.post('/', (req, res) =>
  new CreateEnterpriseController(enterpriseRepository).execute(req, res)
);

router.get('/', (req, res) =>
  new GetEnterpriseController(enterpriseRepository).execute(req, res)
);

router.put('/:id', (req, res) =>
  new EditEnterpriseController(enterpriseRepository).execute(req, res)
);

router.delete('/:id', (req, res) =>
  new DeleteEnterpriseController(enterpriseRepository).execute(req, res)
);

export { router as enterpriseRouter };
