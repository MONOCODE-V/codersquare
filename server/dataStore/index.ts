import e from "express";
import type { postDoa } from "./postDoa.js";
import type { userDoa } from "./userDoa.js";
import type { commentsDao } from "./commentsDao.js";
import type { likeDao } from "./likeDao.js";

export interface dataStore extends postDoa, userDoa, commentsDao, likeDao {}

