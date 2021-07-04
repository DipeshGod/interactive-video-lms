import { string } from 'joi';
import mongoose, { } from 'mongoose';
import { IExerciseDoc, IExerciseModel } from '../interfaces/models/Exercise';

const exerciseSchema = new mongoose.Schema({
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
    answer: {
        type: [String],
        required: true
    }
})

const Exercise = mongoose.model<IExerciseDoc, IExerciseModel>('exercise', exerciseSchema);

export { Exercise };