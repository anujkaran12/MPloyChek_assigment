import { Router } from 'express';
import { getRecords } from '../controllers/records.controller';
import { applyDelay } from '../middleware/delay.middleware';
import { requireAuth } from '../middleware/auth.middleware';

export const recordsRoutes = Router();

recordsRoutes.get('/', requireAuth, applyDelay, getRecords);
