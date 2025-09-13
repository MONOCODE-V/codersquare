import type  { ExpressHandler } from "../Handlers/api.js";

import { verifyJwt } from "../server/auth.js";


export const authMiddleware: ExpressHandler<{}, {}> = (req, res, next) => {
    const authHeader = req.headers.authorization?.split(' ')[1]; // Extract token from "Bearer <token>"

    if (!authHeader) {
        return res.status(401).json({ error: 'Unauthorized' });
    }   


    try {
    const payload = verifyJwt(authHeader);

    const userId = payload?.userId;
    if (!userId) {


        throw new Error('Invalid token payload');
    }
                  res.locals.userId = userId;

    next(); 


}
 
    catch (err) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

}
