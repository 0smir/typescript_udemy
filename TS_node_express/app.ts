// import { createServer } from 'node:http';

// const server = createServer((req, res) => {
//   console.log(req.method);
//   res.end("Hello!");
// });

// server.listen(3000);

import express from 'express';

const app = express();

app.get('/', (req, resp) => {
  console.log(req.method);
  resp.json({ message: "Hello, all!" });
});

app.listen(3000);