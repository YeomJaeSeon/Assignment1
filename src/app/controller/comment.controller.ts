import { Request, Response, NextFunction } from "express";
import { DecodedRequest } from "../definition/decoded_jwt";
import { CommentService } from "../service/comment.service";

export class CommentController {
    private commentService: CommentService;

    public async get(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const commentId: string = String(req.query.id);
        try {
            this.commentService = new CommentService();
            const exComment = await this.commentService.selectComment(commentId);
            return res.status(200).json({
                data: exComment
            })
        } catch (error) {
            next(error)
        }
    }

    public async post(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const userId = req.decodedId;
        const { postId, text } = req.body;
        // const { postId, commentId, text } = req.body;
        
        const commentInfo = { postId, text, userId };
        try {
            this.commentService = new CommentService();
            const result = await this.commentService.uploadComment(commentInfo);
            return res.status(200).json({
                "postId": postId,
                "comment": result,
                message: "Upload Success",
            });
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const commentId: string = String(req.query.id);
        const userId: string = String(req.decodedId);
        this.commentService = new CommentService();
        try {
            const commentInfo = { userId, commentId };
            const exComment = await this.commentService.deleteComment(commentInfo);
            return res.status(200).json({
                message: "Delete Success",
                deletedComment: exComment
            })
        } catch (error) {
            next(error)
        }
    }

    public async patch(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const commentId: string = String(req.query.id);
        const userId: string = String(req.decodedId);
        this.commentService = new CommentService();
        const { text } = req.body;
        try {
            const commentInfo = { commentId, text, userId }
            const exComment = await this.commentService.updateComment(commentInfo);
            return res.status(200).json({
                message: "Update Success",
                updatedComment: exComment
            })
        } catch (error) {
            next(error)
        }
    }

}
