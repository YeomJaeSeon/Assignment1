import { Request, Response, NextFunction } from 'express';
import { PageService } from "../service/page.service"
import { HttpException } from "../exception/http_exception"

export class PageController {
    private pageService: PageService;
    public async page(req: Request, res: Response, next: NextFunction): Promise<any> {
        this.pageService = new PageService()
        const limit = Number(req.query.limit);
        const offset = Number(req.query.offset);
        const pageInfo = { limit, offset }
        try {
            const postList = await this.pageService.getPostList(pageInfo);
            return res.status(200).json({
                list: postList.postList,
                count: postList.totalCount
            });
        }
        catch (error) {
            next(new HttpException(400, error.message));
        }
    }

}