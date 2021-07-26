import { Request, Response } from 'express';
import { IQNARepository } from '../../interfaces/repositories/IQNARepository';
import { BaseController } from '../BaseController';

export class AddAnswerController extends BaseController {
  private QNARepository: IQNARepository;

  constructor(QNARepository: IQNARepository) {
    super();
    this.QNARepository = QNARepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const QNA = await this.QNARepository.getQNAById(req.params.id);
      if (!QNA) return this.fail(res, 'Qna not found ');
      QNA.response.push({ user: req.body.user, answer: req.body.answer });
      const updatedData = await QNA.save();
      return this.ok(res, updatedData);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
