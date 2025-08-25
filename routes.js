import express from 'express';
import handler from './handler.js';

const router = express.Router();

// POST /test route to calculate shipping cost
router.post('/test', handler.shippingCostHandler);

export default router;