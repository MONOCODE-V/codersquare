import e from 'express';
import { DB } from '../server/dataStore/memoryDB/index.js';
import type { RequestHandler } from 'express';
import type { Post } from "../server/types.js"; // Adjust path as needed



export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<Res>,
  Partial<Req>,
  any
>;

export type createPostreq = Pick<Post, 'id' | 'title' | 'URL'>;
export interface createPostresponse {
post: Post;
}