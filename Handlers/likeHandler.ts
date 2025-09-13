import { DB } from "../server/dataStore/index.js";
import type * as api from "./api.js";

// Like Handlers
export const createLike: api.ExpressHandler<{ userId: number; postId: number }, { success: boolean; error?: string }> = async (req, res) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
        res.status(400).json({ success: false, error: "Missing userId or postId" });
        return;
    }
    try {
        await DB.createLike({ userId, postId });
        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
};

export const deleteLike: api.ExpressHandler<{ userId: number; postId: number }, { success: boolean; error?: string }> = async (req, res) => {
    const { userId, postId } = req.body;
    if (!userId || !postId) {
        res.status(400).json({ success: false, error: "Missing userId or postId" });
        return;
    }
    try {
        await DB.deleteLike({ userId, postId });
        res.json({ success: true });
    } catch (err: any) {
        res.status(500).json({ success: false, error: err.message });
    }
};