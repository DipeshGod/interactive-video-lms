import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { ForgotPassword } from '../../services/nodemailer';
import { BaseController } from '../BaseController';

export class ForgotPasswordController extends BaseController {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    super();
    this.authRepository = authRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const user = await this.authRepository.forgotPassword(req.body);
      if (user) {
        const sendMail = await ForgotPassword(user);
        return this.ok(res, sendMail);
      } else {
        return this.fail(res, 'Email not registered');
      }
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
