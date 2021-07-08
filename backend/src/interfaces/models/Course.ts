import mongoose from 'mongoose';

export interface ICourse {
  name: string;
  association: string;
  description: string;
  category: string;
  features: string[];
  goals: string[];
  introductoryVideo: {
    LOW: string,
    SD: string,
    HD: string
  };
  instructors: string[];
  price: number;
  coursePoster: string;
  isFree: boolean;
  published: boolean;
  hasPreTest: boolean;
  hasFinalTest: boolean;
}

export interface ICourseDoc extends mongoose.Document {
  name: string;
  association: string;
  description: string;
  category: string;
  features: string[];
  goals: string[];
  introductoryVideo: {
    LOW: string,
    SD: string,
    HD: string
  };
  instructors: string[];
  price: number;
  coursePoster: string;
  isFree: boolean;
  published: boolean;
  hasPreTest: boolean;
  hasFinalTest: boolean;
}

export interface ICourseModel extends mongoose.Model<ICourseDoc> { }
