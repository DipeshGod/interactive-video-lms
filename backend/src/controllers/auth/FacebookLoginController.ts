import { Request, Response } from "express";
import { IUser } from "../../interfaces/models/User";
import { IAuthRepository } from "../../interfaces/repositories/IAuthRepository";
import { BaseController } from "../BaseController";
import fetch from 'node-fetch';
import crypto from 'crypto';
import { assignToken } from "../../services/jsonwebtoken";
import { hashPassword } from "../../services/bcrypt";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";

export class FacebookLoginController extends BaseController {
  private authRepository: IAuthRepository;
  private userRepository: IUserRepository;
  private facebookAuth: IUser;

  constructor(
    authRepository: IAuthRepository,
    userRepository: IUserRepository
  ) {
    super();
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.facebookAuth = {
      type: 'student',
      name: '',
      password: '',
      email: '',
      verified: true,
      isEnterprise: '',
      profilePicture: '',
    }
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      console.log("req.body", req.body);
      const { userID, accessToken } = req.body;
      const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
      const response: any = await fetch(url, { method: 'GET' });
      const { email, name } = response;
      this.facebookAuth.email = email;
      this.facebookAuth.name = name;
      console.log('response', response);
      const user = await this.userRepository.getUserByEmail(
        this.facebookAuth.email
      );
      if (user !== null) {
        const token = assignToken(user._id);
        res.cookie('token', token, {
          httpOnly: true,
        });
        return this.ok(res, user);
      }
      const generatePassword = crypto.randomBytes(5).toString('hex');
      this.facebookAuth.password = hashPassword(generatePassword);
      const registerUser = await this.authRepository.registerUser(
        this.facebookAuth
      );
      if (!registerUser) return this.fail(res, 'Cannot login using facebook');
      res.cookie('token', assignToken(registerUser._id), {
        httpOnly: true,
      });
      return this.ok(res, registerUser);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
