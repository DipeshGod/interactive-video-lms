import mongoose from 'mongoose';
import {  IResetPasswordDoc, IResetPasswordModel } from '../interfaces/models/Code';

const resetPasswordSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        code: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 1200
        }
    },
    { timestamps: true }
);

const ResetPassword = mongoose.model<IResetPasswordDoc, IResetPasswordModel>('code', resetPasswordSchema);
export { ResetPassword };