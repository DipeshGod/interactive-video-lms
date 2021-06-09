import { Request, Response } from "express";
import { IAuthRepository } from "../../interfaces/repositories/IAuthRepository";
import { BaseController } from "../BaseController";
import { OAuth2Client } from "google-auth-library";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import crypto from "crypto";
import { IUser } from "../../interfaces/models/User";

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
    this.client = new OAuth2Client(process.env.GOOGLE_CLIENT);
    this.authRepository = authRepository;
    this.userRepository = userRepository;
    this.googleAuth = {
      type: "",
      name: "",
      password: "",
      email: "",
      verified: false,
      isEnterprise: "",
      profilePicture: "",
    };
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const { googleIdToken } = req.body;
      this.client
        .verifyIdToken({ googleIdToken, audience: process.env.GOOGLE_CLIENT })
        .then((response: any) => {
          const { email, name } = response.payload;
          this.googleAuth.name = name;
          this.googleAuth.email = email;
          if (!email) return this.fail(res, "Canot fetch email from google");
        });
      const isAlreadyUser = await this.userRepository.getUserByEmail(
        this.googleAuth.email
      );
      if (isAlreadyUser) return this.ok(res, isAlreadyUser);
      if (!isAlreadyUser) {
        this.googleAuth.password = crypto.randomBytes(5).toString("hex");
        const user = await this.authRepository.registerUser(this.googleAuth);
        if (!user) return this.fail(res, "Error While registering an account");
        return this.ok(res, user);
      }
    } catch (err: any) {
      return this.fail(res, err.toString());
    }
  }
}
