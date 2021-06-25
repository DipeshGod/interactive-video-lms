import mongoose from 'mongoose';

export interface ICourse {
  name: string;
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
}

export interface ICourseDoc extends mongoose.Document {
  name: string;
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
}

export interface ICourseModel extends mongoose.Model<ICourseDoc> { }
