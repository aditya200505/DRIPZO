import express from 'express';
import { registerUser, authUser, googleAuth, facebookAuth, logoutUser, getCurrentUser } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', authUser);
router.post('/google', googleAuth);
router.post('/facebook', facebookAuth);
router.post('/logout', logoutUser);
router.get('/me', protect, getCurrentUser);

export default router;
