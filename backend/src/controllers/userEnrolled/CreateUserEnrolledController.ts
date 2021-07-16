import { Request, Response } from "express";
import { BaseController } from "../BaseController";
import { IUserEnrolledRepository } from "./../../interfaces/repositories/IUserEnrolledRepository";

export class CreateUserEnrolledController extends BaseController {
  private userEnrolledRepository: IUserEnrolledRepository;

  constructor(userEnrolledRepository: IUserEnrolledRepository) {
    super();
    this.userEnrolledRepository = userEnrolledRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const userEnrolled = await this.userEnrolledRepository.createUserEnrolled(
        req.body
      );
      return this.ok(res, userEnrolled);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
