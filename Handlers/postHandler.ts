import e from 'express';
import {DB} from "../server/dataStore/index.js"
import type { RequestHandler } from 'express';
import type { Post } from "../server/types.js"; // Adjust path as needed
import type {ExpressHandler} from "./api.js"
import type {createPostresponse} from "./api.js"





export const listPosts: ExpressHandler<{}, createPostresponse[]> = async (req, res) => {
    const posts = await DB.listtPosts() ?? [];
    const response = posts.map((post: Post) => ({ post }));
    res.status(200).json(response);
}   


export const createPost: ExpressHandler<Post, createPostresponse[]> = (req, res) => {

    if (
        typeof req.body.title === "string" &&
        typeof req.body.URL === "string" &&
        typeof req.body.userId === "number"
    ) {
        const newpost: Post = {
            id: 2,
            postedAt: Date.now(),
            title: req.body.title,
            URL: req.body.URL,
            userId: req.body.userId,
        };
        DB.createPost(newpost);
        res.status(201).send([{ post: newpost }]);
    } else {
        res.status(400).send([]);
        return;
    }


    
}
