import {Router} from "express"
import {shortLinkCreateController} from "../controllers/short-links/create"
import {shortLinkRedirectController} from "../controllers/short-links/redirect"
import {debugController} from '../controllers/debug'
import {identifyUserMiddleware} from '../middlewares'

export function getRouter(){
    const router = Router();
    router.get('/debug/', debugController)

    router.post('/short-links', identifyUserMiddleware, shortLinkCreateController)
    router.get('/short-links/:shortLink', identifyUserMiddleware, shortLinkRedirectController)
    return router;
}