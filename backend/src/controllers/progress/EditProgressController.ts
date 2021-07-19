import { Request, Response } from 'express';
import { IProgressRepository } from '../../interfaces/repositories/IProgressRepository';
import { BaseController } from '../BaseController';

export class EditProgressController extends BaseController {
  private progressRepository: IProgressRepository;

  constructor(progressRepository: IProgressRepository) {
    super();
    this.progressRepository = progressRepository;
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const queryData: any = req.query;
      const progress = await this.progressRepository.editProgress(
        queryData,
        req.body
      );
      return this.ok(res, progress);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
