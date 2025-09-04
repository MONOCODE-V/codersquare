import e from "express";
import type { dataStore } from "../index.js";
import type { Post, User, commentss, likes } from "../../types.js";

export class inmemoryDatastore implements dataStore {

  private posts: Post[] = [];
  private users: User[] = []
  private commentarray: commentss[] = [];
  private likes: likes[] = [];
  
  listtPosts(): Post[] | undefined {
     return this.posts;
  }
  createPost(post: Post): void {

    this.posts.push(post);
  }
  getPostby(id: number): Post | undefined {

    return this.posts.find(post => post.id === id);

  }
  deletePostbyId(id: string): void {
    this.posts = this.posts.filter(post => post.id !== parseInt(id));


}
  createUser(user: User): void {
    this.users.push(user);
  }
  getbyemail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }
  getbyusername(username: string): User | undefined {
    return this.users.find(user => user.username === username);
  }
  createComment(comment: commentss): void {
    this.commentarray.push(comment);
  }
  listCommentsALLPost(): commentss[] | undefined {
    return this.commentarray;
  }
  
  listfirstNComments(n: number): commentss[] | undefined {
    return this.commentarray.slice(0, n);
  }
  deleteComment(id: string): void {
    this.commentarray = this.commentarray.filter(comment => comment.id !== parseInt(id));
  }
  createLike(like: likes): void {
    this.likes.push(like);
  }
  deleteLike(like: likes): void {
 
    this.likes = this.likes.filter(l => !(l.userId === like.userId && l.postId === like.postId));
  }
  
   
}
export const DB= new inmemoryDatastore();