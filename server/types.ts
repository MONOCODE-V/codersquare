export interface User {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  username: string;
}

export interface Post {
  id: number;
  title: string;
  URL: string;
  userId: number;
  postedAt: number;
}

export interface likes {
userId: number;
postId: number;
}
export interface commentss {
  id: number;
  userId: number;
  postId: number;
  comment: string;
  commentedAt: number;
}



