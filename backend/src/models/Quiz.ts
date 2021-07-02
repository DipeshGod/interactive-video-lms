import { string } from 'joi';
import mongoose, { } from 'mongoose';
import { IQuizDoc, IQuizModel } from '../interfaces/models/Quiz';

const quizSchema = new mongoose.Schema({
    association: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: ['preTest', 'finalTest', 'module']
    },
    type: {
        type: String,
        required: true,
        enum: ['yesNo', 'multipleChoice', 'quiz']
    },
    question: {
        type: String,
        unique: true,
        minLength: 5
    },
    options: [String],
    answer: [String]
})

const Quiz = mongoose.model<IQuizDoc, IQuizModel>('quiz', quizSchema);

export { Quiz };