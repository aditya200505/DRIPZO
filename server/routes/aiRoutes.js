import express from 'express';
import { chatWithDrippy } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', chatWithDrippy);

export default router;
