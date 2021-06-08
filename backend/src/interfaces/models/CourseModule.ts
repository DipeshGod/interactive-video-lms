import mongoose from 'mongoose';

export interface ICourseModule {
  title: string;
  description: string;
  courseId: string;
  videos: string[];
  assignments: string[];
  quiz: string[];
}

export interface ICourseModuleDoc extends mongoose.Document {
  title: string;
  description: string;
  courseId: string;
  videos: string[];
  assignments: string[];
  quiz: string[];
}

export interface ICourseModuleModel extends mongoose.Model<ICourseModuleDoc> {}
