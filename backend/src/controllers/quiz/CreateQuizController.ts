import { Request, Response } from "express";
import { IQuizRepository } from "../../interfaces/repositories/IQuizRepository";
import { BaseController } from "../BaseController";

export class CreateQuizController extends BaseController {
    private quizRepository: IQuizRepository;

    constructor(quizRepository: IQuizRepository) {
        super();
        this.quizRepository = quizRepository;
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const quiz = await this.quizRepository.createQuiz(req.body);
            return this.ok(res, quiz);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}