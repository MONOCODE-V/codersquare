import type { Post, User, commentss, likes } from "../../types.js";
import type { dataStore } from "../index.js";
import { open } from 'sqlite';
import path from 'path';
import sqlite3 from 'sqlite3';
import fs from 'fs';
import { fileURLToPath } from 'url';

export class sqlDatastore implements dataStore {
    async getUserById(id: number): Promise<User | undefined> {
        return await this.db.get("SELECT * FROM users WHERE id = ?", id);
    }
    private db: any;

    public async DbBuild() {
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const dbDir = path.resolve(__dirname);
        const dbFile = path.join(dbDir, 'codersquare.sqlite');
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        this.db = await open({
            filename: dbFile,
            driver: sqlite3.Database
        });
        this.db.run("PRAGMA foreign_keys = ON");
        await this.db.migrate({
            migrationsPath: path.join(path.dirname(fileURLToPath(import.meta.url)), 'migration')
        });
        return this;
    }
    

    async listtPosts(): Promise<Post[] | undefined> {
        return await this.db.all("SELECT * FROM posts");
    }

    async createPost(post: Post): Promise<void> {
       await this.db.run(
    "INSERT INTO posts (title, url, userId, dateCreated) VALUES (?, ?, ?, ?)",
    post.title, post.url, post.userId, post.dateCreated
);
    }

    async getPostbyID(id: number): Promise<Post | undefined> {
        return await this.db.get("SELECT * FROM posts WHERE id = ?", id);
    }

    async deletePostbyId(id: string): Promise<void> {
        await this.db.run("DELETE FROM posts WHERE id = ?", id);
    }

    async createUser(user: User): Promise<void> {
        await this.db.run(
            "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
            user.id, user.username, user.email, user.password
        );
    }

    async getbyemail(email: string): Promise<User | undefined> {
        return await this.db.get("SELECT * FROM users WHERE email = ?", email);
    }

    async getbyusername(username: string): Promise<User | undefined> {
        return await this.db.get("SELECT * FROM users WHERE username = ?", username);
    }

    async createComment(comment: commentss): Promise<void> {
      await this.db.run(
    "INSERT INTO comments (id, userId, postId, comment, dateCreated) VALUES (?, ?, ?, ?, ?)",
    comment.id, comment.userId, comment.postId, comment.comment, comment.dateCreated
);
    }

    async listCommentsALLPost(): Promise<commentss[] | undefined> {
        return await this.db.all("SELECT * FROM comments");
    }

    async listfirstNComments(n: number): Promise<commentss[] | undefined> {
        return await this.db.all("SELECT * FROM comments ORDER BY dateCreated DESC LIMIT ?", n);
    }

    async deleteComment(id: string): Promise<void> {
        await this.db.run("DELETE FROM comments WHERE id = ?", id);
    }

    async createLike(like: likes): Promise<void> {
        await this.db.run(
            "INSERT INTO likes (postId, userId) VALUES (?, ?)",
            like.postId, like.userId
        );
    }

    async deleteLike(like: likes): Promise<void> {
        await this.db.run(
            "DELETE FROM likes WHERE postId = ? AND userId = ?",
            like.postId, like.userId
        );
    }
}