import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { BaseController } from '../BaseController';
import { Query } from 'mongoose';
import { IUserDoc } from './../../interfaces/models/User';

export class VerifyUserController extends BaseController {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    super();
    this.authRepository = authRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const id = req.params.id;
      if (!id) return this.fail(res, 'wrong api');
      req.body.verified = true;
      const user = await this.authRepository.verifyUser(id, req.body);
      return this.ok(res, user);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
