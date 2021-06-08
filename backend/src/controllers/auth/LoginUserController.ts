import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { checkPassword } from '../../services/bcrypt';
import { BaseController } from '../BaseController';
import { assignToken } from '../../services/jsonwebtoken';

export class LoginController extends BaseController {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    super();
    this.authRepository = authRepository;
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ): Promise<void | any> {
    try {
      const user = await this.authRepository.login(req.body);
      if (!user) return this.fail(res, 'error while logging in');
      if (!user.verified) return this.fail(res, 'please verify your email');
      try {
        if (checkPassword(req.body.password, user.password)) {
          let token = assignToken(user._id);
          res.cookie('token', token, {
            httpOnly: true,
            // secure:true
          });
          return this.ok(res, user);
        } else {
          return this.forbidden(res, 'Wrong Password, enter again');
        }
      } catch (err) {
        throw new Error(`couldn't find user`);
      }
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
