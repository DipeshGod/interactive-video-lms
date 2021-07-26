import { Request, Response } from 'express';
import { IQNARepository } from '../../interfaces/repositories/IQNARepository';
import { BaseController } from '../BaseController';

export class GetQNAByIdController extends BaseController {
  private QNARepository: IQNARepository;

  constructor(QNARepository: IQNARepository) {
    super();
    this.QNARepository = QNARepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const qna = await this.QNARepository.getQNAById(req.params.id);
      return this.ok(res, qna);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
