import { Request, Response } from "express";
import { IUser } from "../../interfaces/models/User";
import { IAuthRepository } from "../../interfaces/repositories/IAuthRepository";
import { BaseController } from "../BaseController";
import fetch from 'node-fetch';

export class FacebookLoginController extends BaseController {
  private authRepository: IAuthRepository;
  private facebookAuth: IUser;

  constructor(authRepository: IAuthRepository) {
    super();
    this.authRepository = authRepository;
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
      console.log('response', response);
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
