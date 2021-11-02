import { getConnection, MongoRepository, Repository, getMongoRepository } from "typeorm";
import { Post } from "../entity/post";

export class PageService {
    private postRepository: MongoRepository<Post>;

    constructor() {
        this.postRepository = getConnection().getMongoRepository(Post);
    }

    async getPostList(pageInfo) {
        const { limit, offset } = pageInfo;
        const [postList, count] = await this.postRepository
            .findAndCount({
                order: {
                  created_at : 'ASC'
                },
                take: limit,
                skip: (offset - 1) * limit
            })
        
        return { postList : postList, totalCount : postList.length };
    }

}