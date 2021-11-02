import express, { Request, Response, Router, NextFunction } from 'express';
import { PostController } from '../controller/post.controller';
import { authJwt } from "../middlewares/auth.middleware";
import { DecodedRequest } from '../definition/decoded_jwt'
const router: Router = express.Router();
const controller: PostController = new PostController();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await controller.get(req, res, next);
});

router.get('/title', async (req: Request, res: Response, next: NextFunction) => {
    await controller.getPostByTitle(req, res, next);
});

router.get('/email', async (req: Request, res: Response, next: NextFunction) => {
    await controller.getPostByEmail(req, res, next);
});

router.get('/category', async (req: Request, res: Response, next: NextFunction) => {
    await controller.getPostByCategory(req, res, next);
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


export const postRouter: Router = router;