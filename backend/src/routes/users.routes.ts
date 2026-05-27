import { Router } from 'express';
import { listUsers, updateUser } from '../controllers/users.controller';
import { requireAdmin, requireAuth } from '../middleware/auth.middleware';

export const usersRoutes = Router();

usersRoutes.use(requireAuth, requireAdmin);
usersRoutes.get('/', listUsers);
usersRoutes.put('/:id', updateUser);
