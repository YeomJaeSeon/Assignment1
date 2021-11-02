import { HttpException } from "./http_exception";

export class CommentNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `Comment ${id}  not found`);
    }
}