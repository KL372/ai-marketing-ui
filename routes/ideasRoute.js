// routes/ideasRoute.js
import express from 'express';
import { getIdeas } from '../controllers/ideasController.js';

const router = express.Router();

router.get('/', (req, res) => res.render('ideas', { options: null }));
router.post('/', getIdeas);

export default router;
