import { Request, Response } from 'express';
import { IEnterpriseRepository } from '../../interfaces/repositories/IEnterpriseRepository';
import { BaseController } from '../BaseController';

export class GetEnterpriseController extends BaseController {
  private enterpriseRepository: IEnterpriseRepository;

  constructor(enterpriseRepository: IEnterpriseRepository) {
    super();
    this.enterpriseRepository = enterpriseRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const enterprise = await this.enterpriseRepository.getEnterprise();
      return this.ok(res, enterprise);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
