import e from "express";
import type { Post } from "../types.ts";

export interface postDoa {
    listtPosts(): Post[]|undefined;
    createPost(post:Post): void;
    getPostby(id:number): Post|undefined;
    deletePostbyId(id:string): void;
}



