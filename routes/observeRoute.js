// routes/observeRoute.js
import express from 'express';
import { getObserve } from '../controllers/observeController.js';

const router = express.Router();

router.get('/', (req, res) => res.render('observe', { options: null }));
router.post('/', getObserve);

export default router;
