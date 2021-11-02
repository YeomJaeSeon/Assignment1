import express, { Request, Response, Router, NextFunction } from 'express';
import { CommentController } from '../controller/comment.controller';
import { authJwt } from "../middlewares/auth.middleware";
import { DecodedRequest } from '../definition/decoded_jwt'
const router: Router = express.Router();
const controller: CommentController = new CommentController();

router.get('/', authJwt, async (req: DecodedRequest, res: Response, next: NextFunction) => {
    await controller.get(req, res, next);
});

router.post('/', authJwt, async (req: DecodedRequest, res: Response, next: NextFunction) => {
    await controller.post(req, res, next);
});

router.patch('/', authJwt, async (req: DecodedRequest, res: Response, next: NextFunction) => {
    await controller.patch(req, res, next);
})

router.delete('/', authJwt, async (req: DecodedRequest, res: Response, next: NextFunction) => {
    await controller.delete(req, res, next);
})


export const commentRouter: Router = router;