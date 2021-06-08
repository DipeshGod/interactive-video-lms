import { Query } from 'mongoose';
import {
  ICourseModule,
  ICourseModuleDoc,
  ICourseModuleModel,
} from '../interfaces/models/CourseModule';
import { ICourseModuleRepository } from '../interfaces/repositories/ICourseModuleRepository';

export class CourseModuleRepository implements ICourseModuleRepository {
  private model: ICourseModuleModel;

  constructor(model: ICourseModuleModel) {
    this.model = model;
  }

  createCourseModule(
    courseModuleData: ICourseModule
  ): Promise<ICourseModuleDoc> {
    try {
      let courseModule = new this.model(courseModuleData);
      return courseModule.save();
    } catch (err: any) {
      throw new Error('Couldnt create course module');
    }
  }
}
