import express from 'express';
import type { Request, Response, NextFunction } from 'express';
import {DB} from "./server/dataStore/memoryDB/index.js";
// import type { Post, User, commentss, likes } from "./server/types.ts"; // keep only if needed

const app = express();
app.use(express.json());
const port = 3000;

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
app.post('/posts', (req: Request, res: Response) => {
    const post = req.body ;
    DB.createPost(post);
    res.status(201).send('Post created');
});
app.get('/posts', (req: Request, res: Response) => {
    res.send(DB.listtPosts());
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});



