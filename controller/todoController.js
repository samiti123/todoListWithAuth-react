import jwt from 'jsonwebtoken';
import Todo from '../model/todoModel.js';

const authUserId = (token) => {
  const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
  const id = decoded._id;
  return id;
};

export const addTodo = async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    description: req.body.description,
    user: authUserId(req.headers.token),
  });

  try {
    const data = await todo.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getTodos = async (req, res) => {
  try {
    const data = await Todo.find({
      user: authUserId(req.headers.token),
    });
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const getTodo = async (req, res) => {
  try {
    const todo = await Todo.findById({
      _id: req.params.id,
    });
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      (error, result) => {
        error ? console.log(error.message) : result;
      }
    );
    res.status(200).send(todo);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const Todo = await Todo.findByIdAndDelete(
      req.params.id,
      (error, result) => {
        error ? console.log(error.message) : result;
      }
    );
    res.status(200).send('todo deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
