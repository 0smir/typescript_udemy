import express, { Request, Response } from 'express';
import { addTodo, getTodo, getTodos, removeTodo, updateTodo } from './data.js';


const router = express.Router();

// function handlePostTodos(req: Request, res: Response){} // example of stande alone function


//we can add handlePostTodos instead of (req, resp) as a second argument
router.post('/todos', (req, resp) => {
  const text = req.body.text;
  const addedTodo = addTodo(text);

  resp.json({ message: 'todo added!', todo: addedTodo });
});


router.get('/todos', (req, resp) => {
  const todos = getTodos();
  resp.json({ todos });
});

router.get('/todos/:id', (req, resp) => {
  const todo = getTodo(+req.params.id);
  resp.json({ todo });
});

router.patch('/todos/:id', (req, resp) => {
  const updatedTodo = updateTodo(+req.params.id, req.body.text);
  resp.json({ message: 'Todo updated', todo: updatedTodo });
});

router.delete('/todos/:id', (req, resp) => {
  removeTodo(+req.params.id);
  resp.json({ message: 'Deleted' });
})

export default router;