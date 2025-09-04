import type { likes } from "../types.js";


export interface likeDao {
    createLike(like:likes): void;
    deleteLike(like:likes): void;
}