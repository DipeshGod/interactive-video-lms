import { Router } from "express";
import { ForgotPasswordController } from "../controllers/auth/ForgotPasswordController";
import { LoginController } from "../controllers/auth/LoginUserController";
import { RegisterUserController } from "../controllers/auth/RegisterUserController";
import { ResetPasswordController } from "../controllers/auth/ResetPasswordController";
import { AuthRepository } from "../repositories/AuthRepository";
import { User } from "./../models/User";
import { ResetPassword } from "./../models/Code";
import { UserRepository } from "../repositories/UserRepository";
import { VerifyUserController } from "../controllers/auth/VerifyUserController";
import { GoogleLoginController } from "../controllers/auth/GoogleLoginController";
import { FacebookLoginController } from "../controllers/auth/FacebookLoginController";

const router = Router();

const authRepository = new AuthRepository(User, ResetPassword);
const userRepository = new UserRepository(User);

router.post("/register", (req, res) => {
  new RegisterUserController(authRepository).execute(req, res);
});

router.post("/login", (req, res) => {
  new LoginController(authRepository).execute(req, res);
});

router.post("/forgot-password", (req, res) =>
  new ForgotPasswordController(authRepository).execute(req, res)
);

router.post("/reset-password", (req, res) =>
  new ResetPasswordController(authRepository, userRepository).execute(req, res)
);

router.get("/verify/:id", (req, res) =>
  new VerifyUserController(authRepository).execute(req, res)
);

router.post("/facebook-login", (req, res) =>
  new FacebookLoginController(authRepository,userRepository).execute(req, res)
);

router.post("/google-login", (req, res) =>
  new GoogleLoginController(authRepository,userRepository).execute(req, res)
);

export { router as authRouter };
