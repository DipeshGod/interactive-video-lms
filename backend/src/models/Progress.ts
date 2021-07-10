import mongoose from "mongoose";
import { IStudentProgressDoc, IStudentProgressModel } from "../interfaces/models/Progress";

const progressSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    courseId: {
        type: mongoose.Types.ObjectId,
        ref: 'course'
    },
    preTestScore: {
        type: Number
    },
    finalTestScore: {
        type: Number
    },
    module: [{
        id: {
            type: mongoose.Types.ObjectId,
            ref: 'module'
        },
        score: {
            type: Number,
            min: 0,
            max: 100
        }
    }],
    totalExercise: {
        type: Number,
    },
    solvedExercise: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const StudentProgress = mongoose.model<IStudentProgressDoc, IStudentProgressModel>('progress', progressSchema);

export { StudentProgress }