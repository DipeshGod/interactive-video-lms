import { Request, Response } from 'express';
import { IEnterpriseRepository } from '../../interfaces/repositories/IEnterpriseRepository';
import { BaseController } from '../BaseController';

export class CreateEnterpriseController extends BaseController {
  private enterpriseRepository: IEnterpriseRepository;

  constructor(enterpriseRepository: IEnterpriseRepository) {
    super();
    this.enterpriseRepository = enterpriseRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      console.log(req.body);
      const enterprise = await this.enterpriseRepository.createEnterprise(
        req.body
      );
      return this.ok(res, enterprise);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
