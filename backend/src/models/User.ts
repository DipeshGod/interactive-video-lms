import mongoose from 'mongoose';
import { IUser, IUserDoc, IUserModel } from './../interfaces/models/User';

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
            unique:true
        },
        password: {
            type: String,
            required: true
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
        }
    }
);

const User = mongoose.model<IUserDoc, IUserModel>('user', userSchema);

export { User };