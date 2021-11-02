import { getConnection, MongoRepository } from "typeorm";
import { Post } from "../entity/post";
import { Comment } from "../entity/comment";
import { User } from "../entity/user";
import { PostNotFoundException } from "../exception/post_not_found_exception";
import { PermissionException } from '../exception/permission_exception';
import { UserNotFoundException } from "../exception/user_not_found_exception";
import { CommentNotFoundException } from "../exception/comment_not_found_exception";

export class CommentService {
    private commentRepository: MongoRepository<Comment>;
    private postRepository: MongoRepository<Post>;
    private userRepository: MongoRepository<User>;

    constructor() {
        this.userRepository = getConnection().getMongoRepository(User);
        this.postRepository = getConnection().getMongoRepository(Post);
        this.commentRepository = getConnection().getMongoRepository(Comment);
    }

    async selectComment(commentId: string): Promise<any> {
        const comment = await this.commentRepository
            .findOne(commentId);
        if (comment === undefined) {
            throw new CommentNotFoundException(String(commentId));
        } else {
            return comment;
        }
    }

    async uploadComment(commentInfo) {
        const { commentId, postId, text, userId } = commentInfo;
        try {
            const user = await this.userRepository.findOne(userId);
            if (user === undefined) {
                throw new UserNotFoundException(String(userId));
            }
            const post = await this.postRepository.findOne(postId);
            if (post === undefined) {
                throw new PostNotFoundException(String(postId));
            }
            const commentInfo = { postId: postId, text: text, userId: userId, comments: [] };
            const comment = await this.commentRepository.save(commentInfo);
            if (commentId) {
                const exComment = await this.commentRepository.findOne(commentId);
                await exComment.comments.push(comment);
                await this.commentRepository.save(exComment);
            }
            post.comments.push(comment);
            await this.postRepository.save(post);
            return comment;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateComment(updatePostInfo): Promise<any> {
        const { text, commentId, userId } = updatePostInfo;
        const comment = await this.commentRepository
            .findOne(commentId);
        if (comment == undefined) {//해당 댓글이 없을 경우
            throw new CommentNotFoundException(String(commentId));
        }
        const user = await this.userRepository
            .findOne(userId);
        if (comment.email != user.email) { // 해당 댓글이 존재하지만 작성자 이메일과 로그인이메일이 다른 경우
            throw new PermissionException(String(commentId));
        }
        try {
            comment.text = text || comment.text;
            await this.commentRepository.save(comment);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteComment(deletePostInfo): Promise<any> {
        const { commentId, userId } = deletePostInfo;
        const comment = await this.commentRepository
            .findOne(commentId);
        if (comment == undefined) {// 해당 댓글이 없을 경우
            throw new CommentNotFoundException(String(commentId));
        }
        const user = await this.userRepository
            .findOne(userId);
        if (comment.email != user.email) {// 작성자 이메일과 로그인 이메일이 다른 경우
            throw new PermissionException(String(commentId));
        }
        try {
            await this.commentRepository.remove(comment);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
