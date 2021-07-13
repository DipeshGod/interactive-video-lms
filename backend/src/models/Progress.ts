import mongoose, { Schema } from "mongoose";
import { IStudentProgressDoc, IStudentProgressModel } from "../interfaces/models/Progress";

const progressSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'course',
        required: true
    },
    preTestScore: {
        score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        solvedQuestions: {
            type: Number,
            min: 0,
            default: 0
        },
        totalQuestions: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    finalTestScore: {
        score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        solvedQuestions: {
            type: Number,
            min: 0,
            default: 0
        },
        totalQuestions: {
            type: Number,
            min: 0,
            default: 0
        }
    },
    module: [{
        id: {
            type: Schema.Types.ObjectId,
            ref: 'module'
        },
        score: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        solvedQuestions: {
            type: Number,
            min: 0,
            default: 0
        },
        totalQuestions: {
            type: Number,
            min: 0,
            default: 0
        }
    }],
}, { timestamps: true })

const StudentProgress = mongoose.model<IStudentProgressDoc, IStudentProgressModel>('progress', progressSchema);

export { StudentProgress }