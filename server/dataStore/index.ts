import e from "express";
import type { postDoa } from "./DAO/postDoa.js";
import type { userDoa } from "./DAO/userDoa.js";
import type { commentsDao } from "./DAO/commentsDao.js";
import type { likeDao } from "././DAO/likeDao.js";
import {inmemoryDatastore} from "./memoryDB/index.js"
// Ensure the file exists at the specified path, or update the path if necessary
// Update the import path to match the actual file location and extension
import { sqlDatastore } from "./sql/dbIndex.js";
export interface dataStore extends postDoa, userDoa, commentsDao, likeDao {}

export let DB: dataStore;

//inmomory database
 export async function DbBuild() {
    DB =   await new  sqlDatastore().DbBuild();
}
//sqlite database
