import mongoose from 'mongoose';

export interface IQNA {
  user: string;
  course: string;
  question: string;
  response: [string];
}

export interface IQNADOC extends mongoose.Document {
  user: string;
  course: string;
  question: string;
  response: [string];
}

export interface IQNAModel extends mongoose.Model<IQNADOC> {}
