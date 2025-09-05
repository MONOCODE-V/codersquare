import type { commentss } from "../../types.js";

export interface commentsDao {
    createComment(comment: commentss): Promise<void>;
    listCommentsALLPost(): Promise<commentss[] | undefined>;
    listfirstNComments(n: number): Promise<commentss[] | undefined>;
    deleteComment(id: string): Promise<void>;
}