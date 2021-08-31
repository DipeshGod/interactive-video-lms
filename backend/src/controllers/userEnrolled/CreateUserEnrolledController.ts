import { Request, Response } from "express";
import { any } from "joi";
import { ICourseModuleRepository } from "../../interfaces/repositories/ICourseModuleRepository";
import { IProgressRepository } from "../../interfaces/repositories/IProgressRepository";
import { BaseController } from "../BaseController";
import { IUserEnrolledRepository } from "./../../interfaces/repositories/IUserEnrolledRepository";

export class CreateUserEnrolledController extends BaseController {
  private userEnrolledRepository: IUserEnrolledRepository;
  private progressRepository: IProgressRepository;
  private courseModuleRepository: ICourseModuleRepository;

  constructor(
    userEnrolledRepository: IUserEnrolledRepository,
    progressRepository: IProgressRepository,
    courseModuleRepository: ICourseModuleRepository
  ) {
    super();
    this.userEnrolledRepository = userEnrolledRepository;
    this.progressRepository = progressRepository;
    this.courseModuleRepository = courseModuleRepository;
  }

  private moduleProgress = async (modules: any, userProgress: any) => {
    try {
      const moduleProgressOk: any = [];
      // console.log("modules:", modules);
      const progress = await modules.map(async (module: any) => {
        try {
          const moduleProgress =
            await this.progressRepository.createModuleProgress({
              id: module._id,
              title: module.title,
            });
          //   console.log("moduleProgress:", moduleProgress);
          if (!moduleProgress)
            throw new Error("Error While creating module progress");
          await moduleProgressOk.push(moduleProgress._id);
          console.log("over-progress", moduleProgressOk);
          return moduleProgressOk;
        } catch (err: any) {
          throw new Error(err.toString());
        }
      });
      progress.then((data: any) => {
        console.log("data:", data);
      });
      console.log("progress:", progress);
      console.log("userProgress k ayyo ta hai:", userProgress);
      return userProgress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  };

  private createModuleProgress = async (module: any, userProgress: any) => {
    try {
      // console.log("module:", module);
      const moduleProgress = await this.progressRepository.createModuleProgress(
        {
          id: module._id,
          title: module.title,
        }
      );
      if (!moduleProgress)
        throw new Error("Error While creating module progress");
      await userProgress.moduleProgress.push(moduleProgress._id);
      return userProgress;
    } catch (err: any) {
      throw new Error(err.toString());
    }
  };

  //   private createUserModuleProgress = async (
  //     courseId: string,
  //     userId: string
  //   ) => {
  //     try {
  //       // get all course module
  //       const courseModules =
  //         await this.courseModuleRepository.getCourseModuleByCourseId(courseId);

  //       //intitiate user progress without moduleProgress
  //       const userProgress = await this.progressRepository.createProgress({
  //         user: userId,
  //         course: courseId,
  //       });

  //       if (!userProgress)
  //         throw new Error("Error while creating user progress at beggining");
  //       /* 1. courseModule lai map garera
  //    2. [module]={title,id}
  //    3. create at once with module
  // */
  //       const progress = courseModules.map(async (module, i) => {
  //         try {
  //           const overallProgress = await this.createModuleProgress(
  //             module,
  //             userProgress
  //           );
  //           if (courseModules.length === i + 1) return overallProgress;
  //         } catch (err: any) {
  //           throw new Error(err.toString());
  //         }
  //       });
  //       console.log("progress:", progress);
  //       //return progress;
  //     } catch (err: any) {
  //       throw new Error(err.toString());
  //     }
  //   };

  // protected async executeImpl(req: Request, res: Response) {
  //   try {
  //     const { userId, courseId } = req.body;
  //     //check if user is already enrolled in a course
  //     // const isUserAlreadyEnrolled =
  //     //   await this.userEnrolledRepository.checkUserEnrolled(
  //     //     req.body.userId,
  //     //     req.body.courseId
  //     //   );
  //     //if already enrolled return isUserEnrolled=true
  //     //  console.log("isUserAlreadyEnrolled:", isUserAlreadyEnrolled);
  //     // if (isUserAlreadyEnrolled !== null)
  //     //   return this.ok(res, { isUserEnrolled: true });
  //     //else enroll user to a course
  //     const userEnrolled = await this.userEnrolledRepository.createUserEnrolled(
  //       req.body
  //     );
  //     //console.log("userEnrolled:", userEnrolled);
  //     //after enrolling initiate user progress on different modules(module progress)

  //     /* const progress = await this.createUserModuleProgress(
  //       userEnrolled.course,
  //       userEnrolled.user
  //     ); */
  //     // console.log("progress tala", progress);
  //     // console.log('progress:', progress);

  //     // get all course module
  //     const courseModules =
  //       await this.courseModuleRepository.getCourseModuleByCourseId(courseId);
  //     // console.log("get allcourse module:", courseModules);

  //     //intitiate user progress without moduleProgress
  //     const userProgress = await this.progressRepository.createProgress({
  //       user: userId,
  //       course: courseId,
  //     });
  //     // console.log("userProgress:", userProgress);
  //     if (!userProgress)
  //       throw new Error("Error while creating user progress at beggining");
  //     const progress = await this.moduleProgress(courseModules, userProgress);
  //     /*  courseModules.map(async (module, i) => {
  //       try {
  //         const moduleProgress =
  //           await this.progressRepository.createModuleProgress({
  //             id: module._id,
  //             title: module.title,
  //           });
  //         if (!moduleProgress)
  //           throw new Error("Error While creating module progress");
  //         userProgress.moduleProgress.push(moduleProgress._id);
  //         console.log("userProgress mathi:", userProgress);
  //       } catch (err: any) {
  //         throw new Error(err.toString());
  //       }
  //     }); */
  //     console.log("progress after new function:", progress);
  //     return this.ok(res, progress);
  //   } catch (err: any) {
  //     return this.fail(res, err);
  //   }
  // }

  protected async executeImpl(req: Request, res: Response) {
    try {
      const { userId, courseId } = req.body;
      const moduleProgressOk: any[] = [];
      //userEnrolls
      const userEnrolled = await this.userEnrolledRepository.createUserEnrolled(
        req.body
      );
      //   console.log("userEnrolled:", userEnrolled);

      //getting all course module
      const courseModule =
        await this.courseModuleRepository.getCourseModuleByCourseId(courseId);
      // console.log("courseModule:", courseModule);

      courseModule.map(async (module) => {
        try {
          // const progress = await this.newFunction(module, moduleProgressOk);
          const progress = new Promise((resolve: any, reject: any) => {
            const moduleProgress = this.progressRepository.createModuleProgress(
              { module: module._id, title: module.title }
            );
            if (moduleProgress) {
              resolve(moduleProgress);
            } else {
              reject("error creating module progress");
            }
          });

          progress
            .then((data: any) => {
              console.log("data", data);
            })
            .catch((err: any) => {
              return this.fail(res, err);
            });
          //creating module progress
          // const moduleProgress =
          //   await this.progressRepository.createModuleProgress({
          //     id: module._id,
          //     title: module.title,
          //   });
          // // console.log("moduleProgress:", moduleProgress);
          // moduleProgressOk.push(moduleProgress._id);
          // console.log("moduleProgressOK:", moduleProgressOk);
        } catch (err: any) {
          throw new Error(err.toString());
        }
      });
      console.log("progress:", moduleProgressOk);
      return this.ok(res, moduleProgressOk);
    } catch (err: any) {
      return this.fail(res, err);
    }
  }

  /*  private newFunction = async (module: any, moduleProgressOk: any) => {
    const moduleProgress = await this.progressRepository.createModuleProgress({
      module: module._id,
      title: module.title,
    });
    console.log("moduleProgress", moduleProgress);
  }; */
}
