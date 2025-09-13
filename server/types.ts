export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  url: string;
  userId: number;
  dateCreated: number;
}

export interface likes {
userId: number;
postId: number;
}
export interface commentss {
  id?: number;
  userId: number;
  postId: number;
  comment: string;
  dateCreated: number;
}
export interface JWTpayload {
 userId: string;
}

