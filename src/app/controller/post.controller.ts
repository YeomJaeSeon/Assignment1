import { Request, Response, NextFunction } from 'express';
import { DecodedRequest } from '../definition/decoded_jwt'
import { HttpException } from '../exception/http_exception';
import { PostService } from "../service/post.service";

export class PostController {

    private postService: PostService;

    public async get(req: Request, res: Response, next: NextFunction): Promise<any> {
        const postId: string = String(req.query.id);
        console.log(postId);
        this.postService = new PostService();
        try {
            const exPost = await this.postService.selectPost({ id: postId });
            return res.status(200).json({
                data: exPost
            })
        } catch (error) {
            next(error)
        }
    }
    public async getPostByTitle(req: Request, res: Response, next: NextFunction): Promise<any> {
        const title: string = String(req.query.title);
        this.postService = new PostService();
        try {
            const exPost = await this.postService.selectPostTitle(title);
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
        this.postService = new PostService();
        try {
            const exPost = await this.postService.selectPostUserEmail(email);
            return res.status(200).json({
                data: exPost
            })
        } catch (error) {
            next(error)
        }
    }

    public async getPostByCategory(req: Request, res: Response, next: NextFunction): Promise<any> {
        const category: string = String(req.query.category);
        console.log(category);
        this.postService = new PostService();
        try {
            const exPost = await this.postService.selectPostCategory(category);
            return res.status(200).json({
                data: exPost
            })
        } catch (error) {
            next(error)
        }
    }

    public async post(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const userId: string = String(req.decodedId);
        this.postService = new PostService();
        const { title, text } = req.body;
        let { category } = req.body;
        if (!category)
            category = "기타";
        try {
            const postInfo = { userId, text, title, category }
            await this.postService.uploadPost(postInfo);
            return res.status(200).json({
                message: "Upload Success"
            })
        }
        catch (error) {
            next(error)
        }
    }

    public async delete(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const postId: string = String(req.query.id);
        const userId: string = String(req.decodedId);
        this.postService = new PostService();
        try {
            const postInfo = { userId, postId };
            const exPost = await this.postService.deletePost(postInfo);
            return res.status(200).json({
                message: "Delete Success"
            })
        } catch (error) {
            next(error)
        }
    }
    public async patch(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const postId: string = String(req.query.id);
        const userId: string = String(req.decodedId);
        this.postService = new PostService();
        const { text, title } = req.body;
        try {
            const postInfo = { postId, text, title, userId }
            const exPost = await this.postService.updatePost(postInfo);
            return res.status(200).json({
                message: "Update Success"
            })
        } catch (error) {
            next(error)
        }
    }

}