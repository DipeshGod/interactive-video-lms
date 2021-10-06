import { Request, Response } from 'express';
import { IUserDoc } from '../../interfaces/models/User';
import { IEnterpriseRepository } from '../../interfaces/repositories/IEnterpriseRepository';
import { IEnterpriseSectionRepository } from '../../interfaces/repositories/IEnterpriseSectionRepository';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { BaseController } from '../BaseController';

export class CreateEnterpriseSectionController extends BaseController {
  private enterpriseSectionRepository: IEnterpriseSectionRepository;
  private enterpriseRepository: IEnterpriseRepository;
  private userRepository: IUserRepository;

  constructor(
    enterpriseSectionRepository: IEnterpriseSectionRepository,
    enterpriseRepository: IEnterpriseRepository,
    userRepository: IUserRepository
  ) {
    super();
    this.enterpriseSectionRepository = enterpriseSectionRepository;
    this.enterpriseRepository = enterpriseRepository;
    this.userRepository = userRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      //1. Extract users from the request body
      let users: string[] = [];
      req.body.users.forEach((user: any) => {
        users.push(user.data[0]);
      });

      //2. Generate user email and password
      //2a. Find enterprise domain
      const enterprise = await this.enterpriseRepository.getEnterpriseById(
        req.body.enterprise
      );
      //2b. Generate user emails and other datas
      let usersData: any[] = [];
      if (enterprise) {
        users.forEach((user: string) => {
          usersData.push({
            name: user,
            email:
              user.replace(/\s/g, '').toLowerCase() + `@${enterprise.domain}`,
            password: 'blusheep',
            verified: true,
            enterprise: req.body.enterprise,
          });
        });
      }
      //3.Save all section users(create users document)
      const savedUsers = await this.userRepository.createEnterpriseSectionUsers(
        usersData
      );

      //4.Finally create enterpriseSection
      const userIds: any = savedUsers.map((user: IUserDoc) => user._id);
      const section =
        await this.enterpriseSectionRepository.createEnterpriseSection({
          enterprise: req.body.enterprise,
          courses: req.body.courses,
          name: req.body.name,
          users: userIds,
        });

      this.ok(res, { section });
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
