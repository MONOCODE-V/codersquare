import e from "express";
import type { dataStore } from "../index.js";
import type { Post, User, commentss, likes } from "../../types.js";

export class inmemoryDatastore implements dataStore {

  private posts: Post[] = [];
  private users: User[] = [];
  private commentarray: commentss[] = [];
  private likes: likes[] = [];
  
  listtPosts(): Promise<Post[] | undefined> {
    return Promise.resolve(this.posts);
  }
  createPost(post: Post): Promise<void> {
    this.posts.push(post);
    return Promise.resolve();
  }
  getPostbyID(id: number): Promise<Post | undefined> {
    return Promise.resolve(this.posts.find(post => post.id === id));
  }
  deletePostbyId(id: string): Promise<void> {
    this.posts = this.posts.filter(post => post.id !== parseInt(id));
    return Promise.resolve();
  }
  createUser(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }
  getbyemail(email: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.email === email));
  }
   getUserById(id: number): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.id === id));
  }
  getbyusername(username: string): Promise<User | undefined> {
    return Promise.resolve(this.users.find(user => user.username === username));
  }
  createComment(comment: commentss): Promise<void> {
    this.commentarray.push(comment);
    return Promise.resolve();
  }
  listCommentsALLPost(): Promise<commentss[] | undefined> {
    return Promise.resolve(this.commentarray);
  }
  listfirstNComments(n: number): Promise<commentss[] | undefined> {
    return Promise.resolve(this.commentarray.slice(0, n));
  }
  deleteComment(id: string): Promise<void> {
    this.commentarray = this.commentarray.filter(comment => comment.id !== parseInt(id));
    return Promise.resolve();
  }
  createLike(like: likes): Promise<void> {
    this.likes.push(like);
    return Promise.resolve();
  }
  deleteLike(like: likes): Promise<void> {
    this.likes = this.likes.filter(l => !(l.userId === like.userId && l.postId === like.postId));
    return Promise.resolve();
  }
}

