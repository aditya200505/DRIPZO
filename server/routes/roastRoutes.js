import express from 'express';
import { generateRoast, getRoastHistory } from '../controllers/roastController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/generate', protect, generateRoast);
router.get('/history', protect, getRoastHistory);

export default router;
