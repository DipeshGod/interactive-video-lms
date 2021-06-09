import { Request, Response } from 'express';
import { IAuthRepository } from '../../interfaces/repositories/IAuthRepository';
import { BaseController } from '../BaseController';
import { OAuth2Client } from 'google-auth-library';
import { IUserRepository } from '../../interfaces/repositories/IUserRepository';
import crypto from 'crypto';
import { IUser } from '../../interfaces/models/User';

export class GoogleLoginController extends BaseController {
  private authRepository: IAuthRepository;
  private userRepository: IUserRepository;
  private client: any;
  private googleAuth: IUser;

  constructor(
    authRepository: IAuthRepository,
    userRepository: IUserRepository
  ) {
    super();
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.googleAuth = {
      type: '',
      name: '',
      password: '',
      email: '',
      verified: true,
      isEnterprise: '',
      profilePicture: '',
    };
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const { googleIdToken } = req.body;
      const response = await this.client.verifyIdToken({
        idToken: googleIdToken,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      console.log(response);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
