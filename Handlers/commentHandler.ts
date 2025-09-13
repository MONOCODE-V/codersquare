import { DB } from "../server/dataStore/index.js";
import type * as api from "./api.js";

// Comment Handlers
export const createComment: api.ExpressHandler<{ userId: number; postId: number; comment: string }, { success: boolean; error?: string }> = async (req, res) => {
        let { userId, postId, comment } = req.body;
        userId = typeof userId === "string" ? parseInt(userId, 10) : userId;
        postId = typeof postId === "string" ? parseInt(postId, 10) : postId;
        if (typeof userId !== "number" || typeof postId !== "number" || isNaN(userId) || isNaN(postId) || !comment) {
                res.status(400).json({ success: false, error: "userId and postId must be valid numbers, and comment is required" });
                return;
        }
        // Check if user and post exist before inserting
        try {
                const userExists = await DB.getUserById(userId);
                const postExists = await DB.getPostbyID(postId);
                if (!userExists) {
                        res.status(400).json({ success: false, error: "User does not exist" });
                        return;
                }
                if (!postExists) {
                        res.status(400).json({ success: false, error: "Post does not exist" });
                        return;
                }
                                // Let DB auto-generate the comment id
                                await DB.createComment({
                                        // id is omitted for auto-increment
                                        userId,
                                        postId,
                                        comment,
                                        dateCreated: Date.now()
                                });
                                res.json({ success: true });
        } catch (err: any) {
                res.status(500).json({ success: false, error: err.message });
        }
};

export const listCommentsAllPost: api.ExpressHandler<{}, { comments: any[] }> = async (req, res) => {
                try {
                        const comments = await DB.listCommentsALLPost() ?? [];
                        res.json({ comments });
                } catch (err: any) {
                        res.status(500).json({ comments: [] });
                }
};

export const listFirstNComments: api.ExpressHandler<{ n: number }, { comments: any[] }> = async (req, res) => {
                const n = Number(req.query.n);
                if (isNaN(n) || n < 1) {
                        res.status(400).json({ comments: [] });
                        return;
                }
                try {
                        const comments = await DB.listfirstNComments(n) ?? [];
                        res.json({ comments });
                } catch (err: any) {
                        res.status(500).json({ comments: [] });
                }
};

export const deleteComment: api.ExpressHandler<{ id: string }, { success: boolean; error?: string }> = async (req, res) => {
                const { id } = req.body;
                if (!id) {
                        res.status(400).json({ success: false, error: "Missing comment id" });
                        return;
                }
                try {
                        await DB.deleteComment(id);
                        res.json({ success: true });
                } catch (err: any) {
                        res.status(500).json({ success: false, error: err.message });
                }
};