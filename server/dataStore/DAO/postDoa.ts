import type { Post } from "../../types.js";

export interface postDoa {
    listtPosts(): Promise<Post[] | undefined>;
    createPost(post: Post): Promise<void>;
    getPostbyID(id: number): Promise<Post | undefined>;
    deletePostbyId(id: string): Promise<void>;
}
