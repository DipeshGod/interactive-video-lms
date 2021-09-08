import { Request, Response } from 'express';
import { BaseController } from '../BaseController';
import { IUserRepository } from './../../interfaces/repositories/IUserRepository';

export class GetUserByEmailController extends BaseController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const email = req.body.email;
      const user = await this.userRepository.getUserByEmail(email as string);
      return this.ok(res, user);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
