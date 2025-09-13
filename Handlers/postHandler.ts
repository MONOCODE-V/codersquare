// Get a post by ID
import type { Request, Response } from 'express';
import e from 'express';
import {DB} from "../server/dataStore/index.js"
import type { RequestHandler } from 'express';
import type { Post } from "../server/types.js"; // Adjust path as needed
import type {ExpressHandler} from "./api.js"
import type {createPostresponse} from "./api.js"





export const getPostById = async (req: Request, res: Response) => {
    const idRaw = req.body.id ?? req.params.id;
    const id = typeof idRaw === "string" ? parseInt(idRaw, 10) : idRaw;
    if (typeof id !== "number" || isNaN(id)) {
        res.status(400).json({});
        return;
    }
    try {
        const post = await DB.getPostbyID(id);
        if (post) {
            res.status(200).json({ post });
        } else {
            res.status(404).json({});
        }
    } catch (err: any) {
        res.status(500).json({});
    }
};

// Delete a post by ID
export const deletePostById = async (req: Request, res: Response) => {
        const id = req.body.id ?? req.params.id;
        if (!id || typeof id !== "string") {
                res.status(400).json({});
                return;
        }
        try {
                await DB.deletePostbyId(id);
                res.status(200).json({});
        } catch (err: any) {
                res.status(500).json({});
        }
};


export const listPosts: ExpressHandler<{}, createPostresponse[]> = async (req, res) => {


        console.log(req.headers.authorization)
        console.log("listPosts called");
    const posts = await DB.listtPosts() ?? [];

    const response = posts.map((post: Post) => ({ post }));
    res.status(200).json(response);
}   


export const createPost: ExpressHandler<Post, createPostresponse[]> = (req, res) => {
        req.body.userId = res.locals.userId;
        console.log("createPost called with body:", req.body);
        if (
                typeof req.body.title === "string" &&
                typeof req.body.url === "string" &&
                typeof req.body.userId === "string" 
        ) {
                // Generate a random integer between 1 and 1000
                const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
                let x = randomInt(1, 1000);
                const newpost: Post = {
                        id: x, // You might want to use a proper ID generation strategy
                        dateCreated: Date.now(),
                        title: req.body.title,
                        url: req.body.url,
                        userId: req.body.userId,
                };
                DB.createPost(newpost).then(() => {
                        res.status(201).send([{ post: newpost }]);
                    })
                                        .catch((err: any) => {
                                                if (err.code === 'SQLITE_CONSTRAINT') {
                                                     
                                                    console.error('Constraint violation:', err);
                                                    res.status(400).send([]);
                                                } else {
                                                        res.status(500).send([]);
                                                }
                                        });
        } else {
                res.status(400).send([]);
                return;
        }





    
}