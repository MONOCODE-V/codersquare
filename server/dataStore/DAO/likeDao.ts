import type { likes } from "../../types.js";

export interface likeDao {
    createLike(like: likes): Promise<void>;
    deleteLike(like: likes): Promise<void>;
}
