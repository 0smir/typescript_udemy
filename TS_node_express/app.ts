// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//   console.log(req.method);
//   res.end("Hello!");
// });

// app.get('/', (req, resp) => {
//   console.log(req.method);
//   resp.json({ message: "Hello, all!" });
// });


// server.listen(3000);

import express, { Request, Response, NextFunction } from 'express';
import todoRoutes from './routes/todo.js';

const app = express();

app.use(express.json());
app.use(todoRoutes);

app.use((err: Error, req: Request, resp: Response, next: NextFunction) => {
  resp.status(500).json({ message: 'An error occured!' });
})

app.listen(3000);