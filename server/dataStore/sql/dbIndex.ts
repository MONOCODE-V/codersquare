import type { Post, User, commentss, likes } from "../../types.js";
import type { dataStore } from "../index.js";
import sql from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import sqlite3 from 'sqlite3';
import { DB } from "../index.js";
import fs from 'fs';
import { fileURLToPath } from 'url';
// open the database

 export class sqlDatastore implements dataStore {
     private db: any;


    public async DbBuild(){
        const __dirname = path.dirname(fileURLToPath(import.meta.url));
        const dbDir = path.resolve(__dirname);
        const dbFile = path.join(dbDir, 'codersquare.sqlite');
        // Ensure the directory exists
        if (!fs.existsSync(dbDir)) {
            fs.mkdirSync(dbDir, { recursive: true });
        }
        this.db = await open({
            filename: dbFile,
            driver: sqlite3.Database
        });
        await this.db.migrate({
            migrationsPath: path.join(path.dirname(fileURLToPath(import.meta.url)), 'migration')
        });
        return this;
    }
    
    
    listtPosts(): Promise<Post[] | undefined> {
        throw new Error("Method not implemented.");
    }
    createPost(post: Post): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getPostby(id: number): Promise<Post | undefined> {
        throw new Error("Method not implemented.");
    }
    deletePostbyId(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createUser(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getbyemail(email: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    getbyusername(username: string): Promise<User | undefined> {
        throw new Error("Method not implemented.");
    }
    createComment(comment: commentss): Promise<void> {
        throw new Error("Method not implemented.");
    }
    listCommentsALLPost(): Promise<commentss[] | undefined> {
        throw new Error("Method not implemented.");
    }
    listfirstNComments(n: number): Promise<commentss[] | undefined> {
        throw new Error("Method not implemented.");
    }
    deleteComment(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    createLike(like: likes): Promise<void> {
        throw new Error("Method not implemented.");
    }
    deleteLike(like: likes): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}