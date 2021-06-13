import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { checkPassword } from '../../services/bcrypt';
import { BaseController } from '../BaseController';
import { assignToken } from '../../services/jsonwebtoken';
import { loginValidator } from '../../services/validator/authValidator';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';

export class LoginController extends BaseController {
  private authRepository: IAuthRepository;
  private userRepository: IUserRepository;

  constructor(authRepository: IAuthRepository,
    userRepository: IUserRepository
  ) {
    super();
    this.authRepository = authRepository;
    this.userRepository = userRepository
  }

  protected async executeImpl(
    req: Request,
    res: Response
  ) {
    try {
      await loginValidator(req.body);
      const user = await this.authRepository.login(req.body);
      if (!user) return this.fail(res, 'error while logging in');
      if (!user.verified) return this.fail(res, 'please verify your email');
      try {
        console.log('user', user);
        if (checkPassword(req.body.password, user.password)) {
          let token = assignToken(user._id);
          res.cookie('token', token, {
            httpOnly: true,
            // secure:true
          });
          const loggedInUser = await this.userRepository.getUserById(user._id)
          return this.ok(res, loggedInUser);
        } else {
          return this.forbidden(res, 'Wrong Password, enter again');
        }
      } catch (err: any) {
        throw new Error(err);
      }
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
