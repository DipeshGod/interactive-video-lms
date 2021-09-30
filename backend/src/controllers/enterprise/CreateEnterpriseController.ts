import { Request, Response } from 'express';
import { IEnterpriseRepository } from '../../interfaces/repositories/IEnterpriseRepository';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { BaseController } from '../BaseController';

//create enterprise user and update the added entperise user document to give permission
//of enterprise client
export class CreateEnterpriseController extends BaseController {
  private enterpriseRepository: IEnterpriseRepository;
  private userRepository: IUserRepository;

  constructor(
    enterpriseRepository: IEnterpriseRepository,
    userRepository: IUserRepository
  ) {
    super();
    this.enterpriseRepository = enterpriseRepository;
    this.userRepository = userRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const enterprise = await this.enterpriseRepository.createEnterprise(
        req.body
      );
      const userId = enterprise.admins[0];
      const user = await this.userRepository.getUserById(userId);
      user?.type.push('enterprise');
      user!.enterprise = enterprise._id;
      await user?.save();
      return this.ok(res, enterprise);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
