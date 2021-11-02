import { getConnection, MongoRepository, Repository, getMongoRepository } from "typeorm";
import { Post } from "../entity/post";

export class PageService {
    private postRepository: MongoRepository<Post>;

    constructor() {
        this.postRepository = getConnection().getMongoRepository(Post);
    }

    async getPostList(pageInfo) {
        const { limit, offset } = pageInfo;
        const [postList, postCount] = await this.postRepository
            .findAndCount({
                take: limit,
                skip: (offset - 1) * limit
            })

        return { postList, postCount };
    }

}