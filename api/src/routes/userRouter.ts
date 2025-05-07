import { Router } from 'express';
import { registerUser, loginUser } from '../controllers/userController.ts';

const router = Router();

// POST-rutt för att registrera en användare
router.post('/register', registerUser);

// POST-rutt för att logga in en användare
router.post('/login', loginUser);

export default router;