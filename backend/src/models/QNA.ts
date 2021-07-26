import { string } from 'joi';
import mongoose, { Schema } from 'mongoose';
import { IQNADOC, IQNAModel } from '../interfaces/models/QNA';

const responseSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  answer: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const qnaSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  course: {
    type: Schema.Types.ObjectId,
    ref: 'course',
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  response: {
    type: [responseSchema],
  },
});

const QNA = mongoose.model<IQNADOC, IQNAModel>('qna', qnaSchema);
export { QNA };
