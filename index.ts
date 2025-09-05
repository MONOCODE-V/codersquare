import express from 'express';
import type { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import {DB} from "./server/dataStore/index.js";
import {DbBuild} from "./server/dataStore/index.js";
import { createPost,listPosts } from './Handlers/postHandler.js';

// import type { Post, User, commentss, likes } from "./server/types.ts"; // keep only if needed

//nodemon --exec "node --loader ts-node/esm" index.ts

(async ()=>{
    await DbBuild();
    
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

app.post('/v1/posts', createPost);
app.get('/v1/posts', listPosts );


const errorHandler:ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
}

app.use(errorHandler);
// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});



})();