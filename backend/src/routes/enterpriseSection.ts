import { Router } from 'express';
import { CreateEnterpriseSectionController } from '../controllers/enterpriseSection/CreateEnterpriseSectionController';
import { GetEnterpriseSectionByIdController } from '../controllers/enterpriseSection/GetEnterpriseSectionByIdController';
import { Enterprise } from '../models/Enterprise';
import { EnterpriseSection } from '../models/EnterpriseSection';
import { EnterpriseRepository } from '../repositories/EnterpriseRepository';
import { EnterpriseSectionRepository } from '../repositories/EnterpriseSectionRepository';

const router = Router();
const enterpriseSectionRepository = new EnterpriseSectionRepository(
  EnterpriseSection
);
const enterpriseRepository = new EnterpriseRepository(Enterprise);

router.post('/', (req, res) =>
  new CreateEnterpriseSectionController(
    enterpriseSectionRepository,
    enterpriseRepository
  ).execute(req, res)
);

router.get('/:id', (req, res) =>
  new GetEnterpriseSectionByIdController(enterpriseSectionRepository).execute(
    req,
    res
  )
);

export { router as enterpriseSectionRouter };
