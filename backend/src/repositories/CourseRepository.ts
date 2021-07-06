import { Query } from 'mongoose';
import { ICourse, ICourseDoc, ICourseModel } from '../interfaces/models/Course';
import { ICourseRepository } from '../interfaces/repositories/ICourseRepository';

export class CourseRepository implements ICourseRepository {
  private model: ICourseModel;

  constructor(model: ICourseModel) {
    this.model = model;
  }

  public getCourse(): Query<ICourseDoc[], ICourseDoc, {}> {
    try {
      const courses = this.model.find({});
      return courses;
    } catch (err) {
      throw new Error('Couldnt get courses');
    }
  }

  public createCourse(courseData: ICourse): Promise<ICourseDoc> {
    try {
      const course = new this.model(courseData);
      return course.save();
    } catch (err) {
      throw new Error('Couldnt create course');
    }
  }

  public getCourseById(courseId: string): Query<ICourseDoc | null, ICourseDoc, {}> {
    try {
      const course = this.model.findById(courseId);
      return course;
    } catch (err) {
      throw new Error('Couldnt get the requested course');
    }
  }

  public editCourse(courseId: string, courseData: ICourse): Query<ICourseDoc | null, ICourseDoc, {}> {
    try {
      const course = this.model.findByIdAndUpdate(courseId, courseData, {
        new: true,
      });
      return course;
    } catch (err) {
      throw new Error(`Couldn't find request course`);
    }
  }

  public deleteCourse(id: string): Query<ICourseDoc | null, ICourseDoc, {}> {
    try {
      return this.model.findByIdAndDelete(id);
    } catch (err: any) {
      throw new Error(`couldn't delete the requested course`);
    }
  }
}
