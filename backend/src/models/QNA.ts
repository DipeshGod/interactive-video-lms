import { string } from 'joi';
import mongoose, { Schema } from 'mongoose';
import { IQNADOC, IQNAModel } from '../interfaces/models/QNA';

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
  questions: {
    type: String,
    required: true,
  },
  response: {
    type: [String],
  },
});

const QNA = mongoose.model<IQNADOC, IQNAModel>('qna', qnaSchema);
export { QNA };
