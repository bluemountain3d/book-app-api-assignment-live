import { Router } from 'express';
import {   registerUser, loginUser, logoutUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/userController.ts';
import { authenticate } from '../middleware/auth.ts';

const router = Router();

// Autentisering
router.post('/register', registerUser); 
router.post('/login', loginUser); 
router.post('/logout', logoutUser); 

// CRUD för users
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.patch('/:id', authenticate, updateUser);  // skyddad
router.delete('/:id', authenticate, deleteUser); // skyddad

export default router;