import e from 'express';
import { DB } from "../server/dataStore/index.js"
import type { RequestHandler } from 'express';
import type { Post, User } from "../server/types.js"; // Adjust path as needed


type WithError<T> = T & { error?: string };

export type ExpressHandler<Req, Res> = RequestHandler<
  string,
  Partial<Res>,
  Partial<Req>,
  any
>;

export type ExpressHandlerToPost<Req, Res> = RequestHandler<
  string,
  string,
  Partial<WithError<Res>>,
  Partial<Req>,
  any
>;

export type createPostreq = Pick<Post, 'title' | 'url' >;
export interface createPostresponse {
post: Post;
}




//user API Handlers
export type sinUpReq = Pick<User, 'firstName' | 'lastName' | 'password' | 'email' | 'username'>;
export interface signUpRes {
}

export interface sinInReq {
login: string;
password: string;
}


export type signInResType ={

  user: Pick<User, 'id' | 'username' | 'email'>;
  Jwt: string

} 