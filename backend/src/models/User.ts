import mongoose from 'mongoose';
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
            enum: ['superAdmin', 'instructor', 'student']
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
            type: String
        },
        isInstructor: {
            type: instructorSchema
        }
    }
);

const User = mongoose.model<IUserDoc, IUserModel>('user', userSchema);

export { User };