import { Request, Response } from 'express';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { BaseController } from '../BaseController';

export class GetUserController extends BaseController {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    super();
    this.userRepository = userRepository;
  }
  protected async executeImpl(req: Request, res: Response) {
    try {
      const users = await this.userRepository.getUser();
      return this.ok(res, users);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
