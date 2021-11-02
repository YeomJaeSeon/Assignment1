import { getConnection, MongoRepository } from "typeorm";
import { PostNotFoundException } from '../exception/post_not_found_exception';
import { PermissionException } from '../exception/permission_exception';
import { UserNotFoundException } from '../exception/user_not_found_exception'
import { Post } from "../entity/post";
import { User } from "../entity/user";

export class SearchService {
    private postRepository: MongoRepository<Post>;

    constructor() {
        this.postRepository = getConnection().getMongoRepository(Post);
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
}
