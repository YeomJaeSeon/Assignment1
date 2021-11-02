import { Request, Response, NextFunction } from "express";
import { DecodedRequest } from "../definition/decoded_jwt";
import { CommentService } from "../service/comment.service";
import { SubCommentService } from "../service/subcomment.service";

export class SubCommentController {
    private subCommentService: SubCommentService;

    public async get(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const commentId: string = String(req.query.id); // subComment를 조회할필요가 있을까? 없다생각함. - comment를 통해서 subComment들을 조회하는것이 의미있다 생각함.

        console.log(commentId);

        try {
            this.subCommentService = new SubCommentService();
            const exComment = await this.subCommentService.selectComment(commentId);
            return res.status(200).json({
                data: exComment
            })
        } catch (error) {
            next(error)
        }
    }

    public async post(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const userId = req.decodedId;
        const { commentId, text } = req.body; //무조건 commentId가있음 (대댓글이므로)
        
        const subCommentInfo = { text, userId, commentId };
        try {
            this.subCommentService = new SubCommentService();
            const result = await this.subCommentService.uploadSubComment(subCommentInfo);
            return res.status(200).json({
                "comment": result,
                message: "Upload Success",
            });
        } catch (error) {
            next(error);
        }
    }

    public async delete(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const subCommentId: string = String(req.query.id);
        const userId: string = String(req.decodedId);
        this.subCommentService = new SubCommentService();
        try {
            const subCommentInfo = { userId, subCommentId };
            const exComment = await this.subCommentService.deleteSubComment(subCommentInfo);
            return res.status(200).json({
                message: "Delete Success",
                deletedComment: exComment
            })
        } catch (error) {
            next(error)
        }
    }

    public async patch(req: DecodedRequest, res: Response, next: NextFunction): Promise<any> {
        const subCommentId: string = String(req.query.id);
        const userId: string = String(req.decodedId);
        this.subCommentService = new SubCommentService();

        const { text } = req.body;
        try {
            const subCommentInfo = { subCommentId, text, userId }
            const exComment = await this.subCommentService.updateSubComment(subCommentInfo);
            return res.status(200).json({
                message: "Update Success",
                updatedComment: exComment
            })
        } catch (error) {
            next(error)
        }
    }

}
