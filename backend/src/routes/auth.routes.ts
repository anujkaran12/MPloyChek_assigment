import { Router } from 'express';
import { login, logout, me } from '../controllers/auth.controller';
import { requireDatabase } from '../middleware/database.middleware';
import { requireAuth } from '../middleware/auth.middleware';

export const authRoutes = Router();

authRoutes.post('/login', requireDatabase, login);
authRoutes.get('/me', requireDatabase, requireAuth, me);
authRoutes.post('/logout', logout);
