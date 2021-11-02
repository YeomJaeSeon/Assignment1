import { getConnection, MongoRepository } from "typeorm";
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

    async selectPostTitle(postTitle: string): Promise<any> {
        const post = await this.postRepository
            .find({ title: postTitle });
        if (post === undefined) {
            throw new PostNotFoundException(String(postTitle));
        } else {
            return post;
        }
    }

    async selectPostUserEmail(userEmail: string): Promise<any> {
        const post = await this.postRepository
            .find({ userEmail: userEmail });
        console.log(post);
        if (post === undefined) {
            throw new PostNotFoundException(String(userEmail));
        } else {
            return post;
        }
    }

    async selectPostCategory(category: string): Promise<any> {
        const post = await this.postRepository
            .find({ category: category });
        if (post === undefined) {
            throw new PostNotFoundException(String(category));
        } else {
            return post;
        }
    }

    async uploadPost(postInfo): Promise<any> {
        const { userId, text, title, category } = postInfo
        const user = await this.userRepository
            .findOne(userId);
        if (user === undefined) {
            throw new UserNotFoundException(String(userId));
        }
        try {
            const postInfo = { title, text, userEmail: user.email, category };//제목 내용 작성자 이메일
            const post = await this.postRepository.save(postInfo);
            return post;
        } catch (error) {
            console.error(error);
        }
    }

    async updatePost(updatePostInfo): Promise<any> {
        const { title, text, postId, userId } = updatePostInfo;
        const post = await this.postRepository
            .findOne(postId);
        if (post == undefined) {//해당 게시글이없을 경우
            throw new PostNotFoundException(String(postId));
        }
        const user = await this.userRepository
            .findOne(userId);
        if (post.userEmail != user.email) { // 해당 게시글이 존재하지만 작성자 이메일과 로그인이메일이 다른 경우
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
        if (post == undefined) {// 해당 게시글이 없을 경우
            throw new PostNotFoundException(String(postId));
        }
        const user = await this.userRepository
            .findOne(userId);
        if (post.userEmail != user.email) {// 작성자 이메일과 로그인 이메일이 다른 경우
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
