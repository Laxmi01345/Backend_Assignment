import express from 'express';
import { SignUp, Login, Users, AllUsers, UpdateUsers, DeleteUser } from '../Controllers/User.js';
import { authenticateUser } from '../Middleware/Auth.js';
const router = express.Router();

router.post('/auth/signup',authenticateUser, SignUp);
router.post('/auth/login',authenticateUser, Login);
router.post('/users',authenticateUser, Users);
router.get('/users/:id',authenticateUser ,AllUsers);
router.put('/users/:id',authenticateUser, UpdateUsers);
router.delete('/users/:id',authenticateUser, DeleteUser);

export default router;
