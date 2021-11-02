import { getConnection, MongoRepository, Repository } from "typeorm";
import { PostNotFoundException } from '../exception/post_not_found_exception';
import { PermissionException } from '../exception/permission_exception';
import { UserNotFoundException } from '../exception/user_not_found_exception'
import { Post } from "../entity/post";
import { User } from "../entity/user";

export class PostService {
    private userRepository: MongoRepository<User>;
    private postRepository: MongoRepository<Post>;

    constructor() {
        this.userRepository = getConnection().getMongoRepository(User);
        this.postRepository = getConnection().getMongoRepository(Post);
    }

    async selectPost(postId): Promise<any> {
        const post = await this.postRepository
            .findOne(postId.id);
        if (post === undefined) {
            throw new PostNotFoundException(String(postId));
        } else {
            return post;
        }
    }

    async uploadPost(postInfo): Promise<any> {
        const { userId, text, title } = postInfo
        const user = await this.userRepository
            .findOne(userId);
        if (user === undefined) {
            throw new UserNotFoundException(String(userId));
        }
        try {
            const postInfo = { title, text, userEmail: user.email };
            const post = await this.postRepository.save(postInfo);
            return post;
        } catch (error) {
            console.error(error);
        }
    }

    async updatePost(updatePostInfo): Promise<any> {
        const { title, text, postId, userId } = updatePostInfo;
        console.log(title, text, postId, userId)
        const post = await this.postRepository
            .findOne(postId);
        if (post == undefined) {
            throw new PostNotFoundException(String(postId));
        }
        const user = await this.userRepository
            .findOne(userId);
        console.log(post.userEmail, user.email)
        if (post.userEmail != user.email) {
            throw new PermissionException(String(postId));
        }
        try {
            post.title = title || post.title;
            post.text = text || post.text;
            await this.postRepository.save(post);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePost(deletePostInfo): Promise<any> {
        const { postId, userId } = deletePostInfo;
        const post = await this.postRepository
            .findOne(postId);
        if (post == undefined) {
            throw new PostNotFoundException(String(postId));
        }
        const user = await this.userRepository
            .findOne(userId);
        console.log(post.userEmail, user.email)
        if (post.userEmail != user.email) {
            throw new PermissionException(String(postId));
        }
        try {
            await this.postRepository.remove(post);
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}
