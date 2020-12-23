import express from 'express';
import {
  login,
  logout,
  register,
  unregister,
} from '../controller/authController.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/unregister', unregister);

export default router;
