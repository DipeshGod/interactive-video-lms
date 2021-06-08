import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { verifyUserMail } from '../../services/nodemailer';
import { BaseController } from '../BaseController';
import { hashPassword } from './../../services/bcrypt';

export class RegisterUserController extends BaseController {
  private userRepository: IAuthRepository;
  mailSend: {
    id: string;
    email: string;
  };

  constructor(userRepository: IAuthRepository) {
    super();
    this.userRepository = userRepository;
    this.mailSend = {
      id: '',
      email: '',
    };
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    try {
      req.body.password = hashPassword(req.body.password);
      const user = await this.userRepository.registerUser(req.body);
      if (!user) return this.fail(res, `Can't register`);
      this.mailSend.id = user._id;
      this.mailSend.email = user.email;
      await verifyUserMail(this.mailSend);
      return this.ok(res, user);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
