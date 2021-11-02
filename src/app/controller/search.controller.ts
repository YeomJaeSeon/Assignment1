import { Request, Response, NextFunction } from 'express';
import { SearchService } from "../service/search.service";

export class SearchController {

    private searchService: SearchService;

    public async getPostByCategory(req: Request, res: Response, next: NextFunction): Promise<any> {
        const category: string = String(req.query.category);
        console.log(category);
        this.searchService = new SearchService();
        try {
            const exPost = await this.searchService.selectPostCategory(category);
            return res.status(200).json({
                data: exPost
            })
        } catch (error) {
            next(error)
        }
    }

    public async getPostByTitle(req: Request, res: Response, next: NextFunction): Promise<any> {
        const title: string = String(req.query.title);
        this.searchService = new SearchService();
        try {
            const exPost = await this.searchService.selectPostTitle(title);
            return res.status(200).json({
                data: exPost
            })
        } catch (error) {
            next(error)
        }
    }

    public async getPostByEmail(req: Request, res: Response, next: NextFunction): Promise<any> {
        const email: string = String(req.query.email);
        console.log(email)
        this.searchService = new SearchService();
        try {
            const exPost = await this.searchService.selectPostUserEmail(email);
            return res.status(200).json({
                data: exPost
            })
        } catch (error) {
            next(error)
        }
    }

}