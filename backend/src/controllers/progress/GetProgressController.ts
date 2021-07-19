import { Request, Response } from 'express';
import { IProgressRepository } from '../../interfaces/repositories/IProgressRepository';
import { BaseController } from '../BaseController';

export class GetProgressController extends BaseController {
  private progressRepository: IProgressRepository;

  constructor(progressRepository: IProgressRepository) {
    super();
    this.progressRepository = progressRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const queryData: any = req.query;
      const progress = await this.progressRepository.getProgress(
        queryData.courseId,
        queryData.userId
      );
      return this.ok(res, progress);
    } catch (err: any) {
      throw this.fail(res, err);
    }
  }
}
