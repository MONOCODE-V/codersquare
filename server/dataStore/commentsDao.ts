import type { commentss } from "../types.js";

export interface commentsDao {
    createComment(comment: commentss): void;
    listCommentsALLPost(): commentss[] | undefined;
    listfirstNComments(n: number): commentss[] | undefined;
    deleteComment(id: string): void;
}