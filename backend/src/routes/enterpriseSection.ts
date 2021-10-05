import { Router } from 'express';
import { CreateEnterpriseSectionController } from '../controllers/enterpriseSection/CreateEnterpriseSectionController';
import { GetEnterpriseSectionByIdController } from '../controllers/enterpriseSection/GetEnterpriseSectionByIdController';
import { EnterpriseSection } from '../models/EnterpriseSection';
import { EnterpriseSectionRepository } from '../repositories/EnterpriseSectionRepository';

const router = Router();
const enterpriseSectionRepository = new EnterpriseSectionRepository(
  EnterpriseSection
);

router.post('/', (req, res) =>
  new CreateEnterpriseSectionController(enterpriseSectionRepository).execute(
    req,
    res
  )
);

router.get('/:id', (req, res) =>
  new GetEnterpriseSectionByIdController(enterpriseSectionRepository).execute(
    req,
    res
  )
);

export { router as enterpriseSectionRouter };
