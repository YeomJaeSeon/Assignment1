import { getConnection, MongoRepository } from "typeorm";
import { Post } from "../entity/post";
import { Comment } from "../entity/comment";
import { UserNotFoundException } from "../exception/user_not_found_exception";
import { User } from "../entity/user";
import { PostNotFoundException } from "../exception/post_not_found_exception";

export class CommentService {
    private commentRepository: MongoRepository<Comment>;
    private postRepository: MongoRepository<Post>;
    private userRepository: MongoRepository<User>;

    constructor() {
        this.userRepository = getConnection().getMongoRepository(User);
        this.postRepository = getConnection().getMongoRepository(Post);
        this.commentRepository = getConnection().getMongoRepository(Comment);
    }
    async post(commentInfo) {
        const { postId, depth, parentId, text, userId } = commentInfo;
        const user = await this.userRepository.findOne(userId);
        if (user === undefined) {
            throw new UserNotFoundException(String(userId));
        }
        try {
            const post = await this.postRepository.findOne(postId);
            if (post === undefined) {
                throw new PostNotFoundException(String(postId));
            }
            const commentInfo = { postId, depth, parentId, text, userId };
            const test = this.commentRepository.create(commentInfo);
            const result = await this.commentRepository.save(test);
            post.comments.push(result);
            await this.postRepository.update(postId, post);
            return post;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
