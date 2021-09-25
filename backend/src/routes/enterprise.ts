import { Router } from 'express';
import { Enterprise } from '../models/Enterprise';
import { CreateEnterpriseController } from '../controllers/enterprise/CreateEnterpriseController';
import { DeleteEnterpriseController } from '../controllers/enterprise/DeleteEnterpriseController';
import { EditEnterpriseController } from '../controllers/enterprise/EditEnterpriseController';
import { GetEnterpriseByIdController } from '../controllers/enterprise/GetEnterpriseByIdController';
import { GetEnterpriseController } from '../controllers/enterprise/GetEnterpriseController';
import { EnterpriseRepository } from '../repositories/EnterpriseRepository';
import { UserRepository } from '../repositories/UserRepository';
import { User } from '../models/User';

const router = Router();

const enterpriseRepository = new EnterpriseRepository(Enterprise);
const userRepository = new UserRepository(User);

router.post('/', (req, res) =>
  new CreateEnterpriseController(enterpriseRepository, userRepository).execute(
    req,
    res
  )
);

router.get('/', (req, res) =>
  new GetEnterpriseController(enterpriseRepository).execute(req, res)
);

router.get('/:id', (req, res) =>
  new GetEnterpriseByIdController(enterpriseRepository).execute(req, res)
);

router.put('/:id', (req, res) =>
  new EditEnterpriseController(enterpriseRepository).execute(req, res)
);

router.delete('/:id', (req, res) =>
  new DeleteEnterpriseController(enterpriseRepository).execute(req, res)
);

export { router as enterpriseRouter };
