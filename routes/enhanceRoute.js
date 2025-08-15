// routes/enhanceRoute.js
import express from 'express';
import { getEnhance } from '../controllers/enhanceController.js';

const router = express.Router();

router.get('/', (req, res) => res.render('enhance', { options: null }));
router.post('/', getEnhance);

export default router; // <--- THIS LINE IS CRITICAL!
