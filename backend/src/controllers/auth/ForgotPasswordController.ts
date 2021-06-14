import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { ForgotPassword } from '../../services/nodemailer';
import { BaseController } from '../BaseController';
import crypto from 'crypto';
import { ResetPassword } from '../../models/ResetPassword';
import { string } from 'joi';

export class ForgotPasswordController extends BaseController {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    super();
    this.authRepository = authRepository;
  }

  protected async executeImpl(req: Request, res: Response){
    try {
      const user = await this.authRepository.forgotPassword(req.body);
      if (!user) return this.fail(res, 'User not registered');
      const resetPassword = new ResetPassword();
      resetPassword.email = user.email;
      resetPassword.code = crypto.randomBytes(3).toString("hex");
      await ForgotPassword({ email: resetPassword.email, code: resetPassword.code });
      const resetPassSaved = await this.authRepository.resetCodeSave(resetPassword);
      return this.ok(res,resetPassSaved);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
