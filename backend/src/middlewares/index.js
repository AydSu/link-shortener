import {randomUUID} from 'crypto'

/**
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */
export function identifyUserMiddleware(req, res, next){
    if (!req.cookies.userId) {
        const userId = randomUUID();
        req.cookies.userId = userId;
        res.cookie('userId', userId);
    }
    next();
}