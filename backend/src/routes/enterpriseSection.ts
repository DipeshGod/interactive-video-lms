import { Router } from 'express';
import { CreateEnterpriseSectionController } from '../controllers/enterpriseSection/CreateEnterpriseSectionController';
import { GetEnterpriseSectionByIdController } from '../controllers/enterpriseSection/GetEnterpriseSectionByIdController';
import { Enterprise } from '../models/Enterprise';
import { EnterpriseSection } from '../models/EnterpriseSection';
import { User } from '../models/User';
import { EnterpriseRepository } from '../repositories/EnterpriseRepository';
import { EnterpriseSectionRepository } from '../repositories/EnterpriseSectionRepository';
import { UserRepository } from '../repositories/UserRepository';

const router = Router();
const enterpriseSectionRepository = new EnterpriseSectionRepository(
  EnterpriseSection
);
const enterpriseRepository = new EnterpriseRepository(Enterprise);
const userRepository = new UserRepository(User);

router.post('/', (req, res) =>
  new CreateEnterpriseSectionController(
    enterpriseSectionRepository,
    enterpriseRepository,
    userRepository
  ).execute(req, res)
);

router.get('/:id', (req, res) =>
  new GetEnterpriseSectionByIdController(enterpriseSectionRepository).execute(
    req,
    res
  )
);

export { router as enterpriseSectionRouter };
