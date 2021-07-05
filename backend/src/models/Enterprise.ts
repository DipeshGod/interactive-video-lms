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
    }
})

const Enterprise = mongoose.model<IEnterpriseDoc, IEnterpriseModel>('enterprise', enterpriseSchema);

export { Enterprise };