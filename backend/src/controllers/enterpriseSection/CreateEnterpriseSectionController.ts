import { Request, Response } from 'express';
import { IEnterpriseRepository } from '../../interfaces/repositories/IEnterpriseRepository';
import { IEnterpriseSectionRepository } from '../../interfaces/repositories/IEnterpriseSectionRepository';
import { BaseController } from '../BaseController';

export class CreateEnterpriseSectionController extends BaseController {
  private enterpriseSectionRepository: IEnterpriseSectionRepository;
  private enterpriseRepository: IEnterpriseRepository;

  constructor(
    enterpriseSectionRepository: IEnterpriseSectionRepository,
    enterpriseRepository: IEnterpriseRepository
  ) {
    super();
    this.enterpriseSectionRepository = enterpriseSectionRepository;
    this.enterpriseRepository = enterpriseRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      console.log('enterpriseSection', req.body);
      //1. Extract users from the request body
      let users: string[] = [];
      req.body.users.forEach((user: any) => {
        users.push(user.data[0]);
      });

      console.log('users', users);
      //2. Generate user email and password
      //2a. Find enterprise domain
      const enterprise = await this.enterpriseRepository.getEnterpriseById(
        req.body.enterprise
      );
      console.log('enterprise', enterprise?.domain);
      //2b. Generate user emails
      let emails: string[] = [];
      if (enterprise) {
        users.forEach((user: string) => {
          emails.push(
            user.replace(/\s/g, '').toLowerCase() + `@${enterprise.domain}`
          );
        });
      }

      console.log('emails', emails);

      //create enterprise section
      //   const enterpriseSection =
      //     await this.enterpriseSectionRepository.createEnterpriseSection(
      //       req.body
      //     );
      //add users from the enterprise to the users collection and make sure they reference the enterprise
      //   return this.ok(res, enterpriseSection);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
