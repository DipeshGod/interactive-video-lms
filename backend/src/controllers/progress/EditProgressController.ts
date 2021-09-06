import { Request, Response } from "express";
import { any, string } from "joi";
import { IProgressRepository } from "../../interfaces/repositories/IProgressRepository";
import { BaseController } from "../BaseController";

interface IModuleProgress {
  score: number;
  totalQuestions: number;
  solvedQuestions: number;
  module: string;
}

export class EditProgressController extends BaseController {
  private progressRepository: IProgressRepository;
  private moduleProgressId: any;
  private moduleProgress: IModuleProgress;
  private i: number = -1;
  constructor(progressRepository: IProgressRepository) {
    super();
    this.progressRepository = progressRepository;
    this.moduleProgress = {
      score: 0,
      totalQuestions: 0,
      solvedQuestions: 0,
      module: "",
    };
  }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const queryData: any = req.query;

      //updating pretest score
      if (req.body.preTest) {
        req.body.preTest.score =
          (req.body.preTest.solvedQuestions / req.body.preTest.totalQuestions) *
          100;

        const progress = await this.progressRepository.editPreTest(
          queryData,
          req.body
        );
        return this.ok(res, progress);
      }

      //updating module score
      if (req.body.module) {
        /* finding module progress id */
        const progress = await this.progressRepository.getModuleProgress(
          queryData
        );

        await progress.moduleProgress.map((progress: any, i: number) => {
          if (progress.module == queryData.courseId) {
            this.i = i;
          }
        });
        /* Calculate Score */
        progress.moduleProgress[this.i].score =
          (req.body.module.solvedQuestions / req.body.module.totalQuestions) *
          100;
        progress.moduleProgress[this.i].totalQuestions =
          req.body.module.totalQuestions;
        progress.moduleProgress[this.i].solvedQuestions =
          req.body.module.solvedQuestions;
        await progress.save();
        console.log("progress:", progress);
        return this.ok(res, progress);
      }

      //updating final test score
      if (req.body.finalTest) {
        req.body.finalTest.score =
          (req.body.finalTest.solvedQuestions /
            req.body.finalTest.totalQuestions) *
          100;

        const progress = await this.progressRepository.editPreTest(
          queryData,
          req.body
        );
        return this.ok(res, progress);
      }
    } catch (err: any) {
      return this.fail(res, err);
    }
  }
}
