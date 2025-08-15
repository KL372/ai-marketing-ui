import express from 'express';
import { getChannel } from '../controllers/channelController.js';

const router = express.Router();

// GET request – show empty form with all variables
router.get('/', (req, res) => {
  res.render('channel', {
    options: null,
    error: null,
    stage: '',
    channel: '',
    product: '',
    target_audience: '',
    industry: '',
    marketing_objective: '',
    business_background: '',
    benefits: '',
    style: '',              
    tone: '',               
    more_instructions: ''   
  });
});

// POST request – generate results
router.post('/', getChannel);

export default router;
