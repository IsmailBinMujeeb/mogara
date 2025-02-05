import express from 'express';
const router = express.Router();

import { slashRout } from '../controllers/routesController.js';

router.get('/', slashRout);

export default router;