import { HttpException } from "./http_exception";

export class SubCommentNotFoundException extends HttpException {
    constructor(id: string) {
        super(404, `SubComment ${id}  not found`);
    }
}