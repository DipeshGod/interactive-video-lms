import { Response, Request } from "express";
import { IQuizRepository } from "../../interfaces/repositories/IQuizRepository";
import { BaseController } from "../BaseController";

export class GetQuizController extends BaseController {
    private quizRepository: IQuizRepository;

    constructor(quizRepository: IQuizRepository) {
        super();
        this.quizRepository = quizRepository
    }

    protected async executeImpl(req: Request, res: Response) {
        try {
            const quizes = await this.quizRepository.getQuiz(req.params.id);
            return this.ok(res, quizes);
        } catch (err: any) {
            return this.fail(res, err);
        }
    }
}