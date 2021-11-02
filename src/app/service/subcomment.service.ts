import { getConnection, MongoRepository } from "typeorm";
import { Comment } from "../entity/comment";
import { User } from "../entity/user";
import { PermissionException } from '../exception/permission_exception';
import { UserNotFoundException } from "../exception/user_not_found_exception";
import { CommentNotFoundException } from "../exception/comment_not_found_exception";
import { SubComment } from "../entity/subcomment";
import { SubCommentNotFoundException } from "../exception/subcomment_not_found_exception";

export class SubCommentService {
    private commentRepository: MongoRepository<Comment>;
    private userRepository: MongoRepository<User>;
    private subCommentRepository: MongoRepository<SubComment>

    constructor() {
        this.userRepository = getConnection().getMongoRepository(User);
        this.commentRepository = getConnection().getMongoRepository(Comment);
        this.subCommentRepository = getConnection().getMongoRepository(SubComment);
    }

    async selectComment(commentId: string): Promise<any> {
        const comment = await this.commentRepository
            .findOne(commentId);
        if (comment === undefined) {
            throw new CommentNotFoundException(String(commentId));
        } else {
            return comment.subComments;
        }
    }

    async uploadSubComment(subCommentInfo) {
        console.log(subCommentInfo)
        const { text, userId, commentId } = subCommentInfo;
        try {
            const user = await this.userRepository.findOne(userId);
            if (user === undefined) {
                throw new UserNotFoundException(String(userId));
            }

            // == 대댓글의 댓글이 없으면 예외 발생 == //
            const comment = await this.commentRepository.findOne(commentId);
            if(comment === undefined){
                throw new CommentNotFoundException(String(commentId));
            }

            const subCommentInfo = { text: text, userId: userId, email: user.email, commentId: commentId };

            // == subComment save == //
            const subComment = await this.subCommentRepository.save(subCommentInfo);

            // == comment에 subcomment push == //
            console.log(comment)
            console.log(comment.subComments)
            comment.subComments.push(subComment);

           // == comment update == //
            await this.commentRepository.save(comment);

            return comment;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateSubComment(updatePostInfo): Promise<any> {
        const { text, subCommentId, userId } = updatePostInfo;
        console.log(text)
        const subComment = await this.subCommentRepository
            .findOne(subCommentId);
        if (subComment == undefined) {//해당 대댓글이 없을시
            throw new SubCommentNotFoundException(String(subCommentId));
        }
        const user = await this.userRepository
            .findOne(userId);
    
        if (subComment.email != user.email) { // 해당 댓글이 존재하지만 작성자 이메일과 로그인이메일이 다른 경우
            throw new PermissionException(String(subCommentId));
        }

        // 댓글도 조회해야함 . 댓글 데이터에서 대댓글 수정해야하긔에..
        const comment = await this.commentRepository
            .findOne(subComment.commentId);
        if (comment === undefined) {//해당 댓글이 없을시
            throw new CommentNotFoundException(String(subComment.commentId));
        }
        try {
            subComment.text = text || subComment.text;
            await this.subCommentRepository.save(subComment);

            comment.subComments = comment.subComments.map(sub => {
                if(String(sub.id) === String(subComment.id)){
                    console.log("같음")
                    return {
                        ...sub,
                        text: text
                    }
                }
                else{
                     return sub;
                }
            })

            await this.commentRepository.save(comment);

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteSubComment(deletePostInfo): Promise<any> {
        const { subCommentId, userId } = deletePostInfo;
        const subComment = await this.subCommentRepository
            .findOne(subCommentId);
        console.log(subCommentId)
        console.log(subComment)
        if (subComment == undefined) {// 해당 댓글이 없을 경우
            throw new SubCommentNotFoundException(String(subCommentId));
        }
        const user = await this.userRepository
            .findOne(userId);
        if (subComment.email != user.email) {// 작성자 이메일과 로그인 이메일이 다른 경우
            throw new PermissionException(String(userId));
        }

        // 댓글도 조회해야함 . 댓글 데이터에서 대댓글 수정해야하긔에..
        const comment = await this.commentRepository
            .findOne(subComment.commentId);
        if (comment === undefined) {//해당 댓글이 없을시
            throw new CommentNotFoundException(String(subComment.commentId));
        }

        try {
            comment.subComments = comment.subComments.filter(sub => {
                console.log(`sub.id: ${sub.id}, subComment.id : ${subComment.id}`)    
                return String(sub.id) != String(subComment.id)
                }
            )

            await this.commentRepository.save(comment);
            await this.subCommentRepository.remove(subComment);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
