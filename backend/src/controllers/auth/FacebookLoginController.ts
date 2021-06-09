import { Request, Response } from "express";
import { IAuthRepository } from "../../interfaces/repositories/IAuthRepository";
import { BaseController } from "../BaseController";

export class FacebookLoginController extends BaseController {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    super();
    this.authRepository = authRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      console.log("req.body", req.body);
      const { userID, accessToken } = req.body;
      const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
      
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
