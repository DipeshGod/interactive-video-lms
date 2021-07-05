import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authentication = async (req: Request, res: Response) => {
    try {
        let getToken: any;
        if (req.headers['x-access-token'])
            getToken = req.headers['x-access-token'];
        if (req.headers['authorization'])
            getToken = req.headers['authorization'];
        if (req.headers['token'])
            getToken = req.headers['token'];
        if (req.query.token)
            getToken = req.query.token;
            getToken
        console.log('getToken', getToken);
        if (!getToken) throw new Error('Authentication token not rpovided');
        const token = getToken.toString();
        const decoded = await jwt.verify(token, `${process.env.JWT_SECRET_KEY}`);
        console.log(decoded);
    } catch (err: any) {
        throw new Error(err.toString());
    }
}

export { authentication };