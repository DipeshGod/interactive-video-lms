import mongoose from 'mongoose';

export interface ICourseModule {
  title: string;
  description: string;
  courseId: string;
  videos: string[];
  quizes: string[];
  questions: string[];
  hasExercise: boolean;
}

export interface ICourseModuleDoc extends mongoose.Document {
  title: string;
  description: string;
  courseId: string;
  videos: string[];
  quizes: string[];
  questions: string[];
  hasExercise: boolean;
}

export interface ICourseModuleModel extends mongoose.Model<ICourseModuleDoc> { }
