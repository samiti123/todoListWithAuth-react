import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Auth from '../model/authModel.js';
import Todo from '../model/todoModel.js';
import { registerValidator, loginValidator } from '../middleware/validation.js';

export const register = async (req, res) => {
  const { error } = registerValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailRegistered = await Auth.findOne({ email: req.body.email });
  if (emailRegistered) return res.status(400).send('Email already used');

  const salt = await bcrypt.genSalt(5);
  const securedPass = await bcrypt.hash(req.body.password, salt);

  const newUser = new Auth({
    name: req.body.name,
    email: req.body.email,
    password: securedPass,
  });

  try {
    const data = await newUser.save();
    res.status(200).send(data);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export const login = async (req, res) => {
  const { error } = loginValidator(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await Auth.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send('Incorrect Email.');

  const checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword) return res.status(400).send('Invalid Password.');

  const generatedToken = jwt.sign(
    {
      _id: user._id,
    },
    process.env.SECRET_TOKEN
  );
  res
    .header('token', generatedToken)
    .status(200)
    .send({ message: 'Logged in!', _id: user._id, token: generatedToken });
};

export const logout = (req, res) => {
  const expiredToken = jwt.sign(
    {
      data: '12345',
    },
    'logout',
    {
      expiresIn: 1,
    }
  );
  res.header('token', expiredToken).status(200).send(expiredToken);
};

export const unregister = async (req, res) => {
  const decoded = jwt.verify(req.headers.token, process.env.SECRET_TOKEN);
  const id = decoded._id;
  try {
    await Auth.findByIdAndDelete(id, (error, result) => {
      error ? console.log(error.message) : result;
    });
    await Todo.deleteMany({ user: id }, (error, result) => {
      error ? console.log(error.message) : result;
    });
    res.status(200).send('User Deleted');
  } catch (error) {
    res.status(400).send(error.message);
  }
};
