import express, { Request, Response, Router, NextFunction } from 'express';
import { SearchController } from '../controller/search.controller';

const router: Router = express.Router();
const controller: SearchController = new SearchController();

router.get('/title', async (req: Request, res: Response, next: NextFunction) => {
    await controller.getPostByTitle(req, res, next);
});

router.get('/email', async (req: Request, res: Response, next: NextFunction) => {
    await controller.getPostByEmail(req, res, next);
});

router.get('/category', async (req: Request, res: Response, next: NextFunction) => {
    await controller.getPostByCategory(req, res, next);
});

export const searchRouter: Router = router;