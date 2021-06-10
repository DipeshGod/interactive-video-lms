import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import { hashPassword } from '../../services/bcrypt';
import { resetPasswordValidator } from '../../services/validator/authValidator';
import { BaseController } from '../BaseController';

export class ResetPasswordController extends BaseController {
  private authRepository: IAuthRepository;
  private userRepository: IUserRepository;

  constructor(
    authRepository: IAuthRepository,
    userRepository: IUserRepository
  ) {
    super();
    this.authRepository = authRepository;
    this.userRepository = userRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      await resetPasswordValidator(req.body);
      const resetPasswordData: any = await this.authRepository.resetPassword(
        req.body.email
      );
      if (req.body.code == resetPasswordData.code)
        req.body.password = hashPassword(req.body.password);
      else return this.fail(res, 'Wrong code entered');
      const updatedUser = await this.userRepository.editUserByEmail(req.body);
      if (updatedUser)
        await this.authRepository.removeResetPasswordModel(
          resetPasswordData._id
        );
      return this.ok(res, updatedUser);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
