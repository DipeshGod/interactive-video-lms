import * as jwt from 'jsonwebtoken';

export const assignToken = (id: string) => {
    return jwt.sign({ id: id }, `${process.env.JWT_SECRET_KEY}`)
}