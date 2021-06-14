import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { verifyUserMail } from '../../services/nodemailer';
import { registerValidator } from '../../services/validator/authValidator';
import { BaseController } from '../BaseController';
import { hashPassword } from './../../services/bcrypt';

export class RegisterUserController extends BaseController {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    super();
    this.authRepository = authRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      await registerValidator(req.body);
      req.body.password = hashPassword(req.body.password);
      const user = await this.authRepository.registerUser(req.body);
      if (!user) return this.fail(res, `Can't register`);
      await verifyUserMail({ id: user._id, email: user.email });
      return this.ok(res, user);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
