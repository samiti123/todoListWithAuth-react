import express from 'express';
import {
  addTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} from '../controller/todoController.js';
import { authenticate } from '../middleware/verify.js';

const router = express.Router();

router.post('/', authenticate, addTodo);
router.get('/', authenticate, getTodos);
router.get('/:id', authenticate, getTodo);
router.patch('/:id', authenticate, updateTodo);
router.delete('/:id', authenticate, deleteTodo);
