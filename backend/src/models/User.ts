import mongoose, { Schema } from 'mongoose';
import { IUser, IUserDoc, IUserModel } from './../interfaces/models/User';

const instructorSchema = new mongoose.Schema({
    bio: {
        type: String
    },
    qualification: {
        type: String
    }
})

const userSchema = new mongoose.Schema(
    {
        type: {
            type: String,
            default: 'student',
            enum: ['superAdmin', 'enterprise', 'instructor', 'student']
        },
        name: {
            type: String,
            //required:true
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        profilePicture: {
            type: String
        },
        verified: {
            type: Boolean,
            default: false
        },
        isEnterprise: {
            type: Boolean
        },
        isInstructor: {
            type: instructorSchema
        },
        enrolledCourse: {
            type: [Schema.Types.ObjectId],
            ref: 'course',
            default: []
        }
    }
);

const User = mongoose.model<IUserDoc, IUserModel>('user', userSchema);

export { User };