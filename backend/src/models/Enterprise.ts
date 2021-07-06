import mongoose from 'mongoose';
import { IEnterpriseDoc, IEnterpriseModel } from '../interfaces/models/Enterprise';

const enterpriseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    users: {
        type: [mongoose.Types.ObjectId],
        ref: 'user'
    },
    admins: {
        type: [mongoose.Types.ObjectId],
        ref: 'user'
    },
    features: {
        type: [String],
        enum: ['exercise', 'assignment']
    },
    courses: {
        type: [mongoose.Types.ObjectId],
        ref: 'course'
    },
    totalUsers: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    }
})

const Enterprise = mongoose.model<IEnterpriseDoc, IEnterpriseModel>('enterprise', enterpriseSchema);

export { Enterprise };