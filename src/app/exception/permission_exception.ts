import { HttpException } from "./http_exception";

export class PermissionException extends HttpException {
    constructor(id: string) {
        super(403, `User ${id} You don't have permission `);
    }
}