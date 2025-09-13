import express from 'express';
import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import {DB} from "./server/dataStore/index.js";
import {DbBuild} from "./server/dataStore/index.js";
import { sinInHandler, sinupHandler } from './Handlers/userHandler.js';
 import { getPostById ,deletePostById,createPost,listPosts } from './Handlers/postHandler.js';
import { createLike, deleteLike } from './Handlers/likeHandler.js';
import { createComment,listCommentsAllPost } from './Handlers/commentHandler.js';
import dotenv from 'dotenv';
dotenv.config();
import { authMiddleware } from './middlewares/authMiddleware.js';
// import type { Post, User, commentss, likes } from "./server/types.ts"; // keep only if needed

//nodemon --exec "node --loader ts-node/esm" index.ts

(async ()=>{
    await DbBuild();
    
const app = express();
app.use(express.json());
const port =process.env.PORT|| 3000;

// Middleware
const requestLoggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.url} - body: ${JSON.stringify(req.body)}`);
  next();
};
app.use(requestLoggerMiddleware);

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});


app.post('/v1/users', sinupHandler);
app.post('/v1/users/auth', sinInHandler);
app.use(authMiddleware); // Apply auth middleware to all routes below
app.post('/v1/posts', createPost);
app.get('/v1/posts', listPosts);
app.post('/v1/comments', createComment);
app.get('/v1/posts/:id', getPostById);
app.delete('/v1/posts/:id', deletePostById);
app.post('/v1/likes', createLike);
app.delete('/v1/likes', deleteLike);
app.get('/v1/comments', listCommentsAllPost);

app.get('/v1/signinStatus', (req: Request, res: Response) => {
  if (res.locals.userId) {
    res.json({ signedIn: true, userId: res.locals.userId });
  } else {
    res.json({ signedIn: false });
  }
});


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};
app.use(errorHandler);
// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});



})();

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
  process.exit(1);
});
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection:', reason);
  process.exit(1);
});