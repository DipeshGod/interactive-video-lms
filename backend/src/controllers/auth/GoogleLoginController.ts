import { Request, Response } from "express";
import { IAuthRepository } from "../../interfaces/repositories/IAuthRepository";
import { BaseController } from "../BaseController";
import { OAuth2Client } from "google-auth-library";
import { IUserRepository } from "../../interfaces/repositories/IUserRepository";
import crypto from "crypto";
import { IUser } from "../../interfaces/models/User";
import { hashPassword } from "../../services/bcrypt";
import { assignToken } from "../../services/jsonwebtoken";
import { assign } from "nodemailer/lib/shared";

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
      type: "student",
      name: "",
      password: "",
      email: "",
      verified: true,
      isEnterprise: "",
      profilePicture: "",
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
      this.googleAuth.email = response.payload.email;
      if (response.payload.email_verified === false)
        return this.fail(
          res,
          "This email is not verified, verify your gmail account first"
        );
      const user = await this.userRepository.getUserByEmail(
        this.googleAuth.email
      );
      if (user !== null) {
        const token = assignToken(user._id);
        res.cookie("token", token, {
          httpOnly: true,
        });
        return this.ok(res, user);
      }
      this.googleAuth.name = response.payload.name;
      const generatePassword = crypto.randomBytes(5).toString("hex");
      this.googleAuth.password = hashPassword(generatePassword);
      const registerUser = await this.authRepository.registerUser(
        this.googleAuth
      );
      if (!registerUser) return this.fail(res, "Cannot login using google");
      res.cookie("token", assign(registerUser._id), {
        httpOnly: true,
      });
      return this.ok(res, registerUser);
    } catch (err: any) {
      console.log(err);
      return this.fail(res, err.toString());
    }
  }
}
