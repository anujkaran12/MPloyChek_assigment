import { NextFunction, Request, Response } from 'express';
import { sessionCookieName } from '../config/cookie';
import { UserRole } from '../models/User';
import { verifyToken } from '../utils/token';

declare global {
  namespace Express {
    interface Request {
      authUser?: {
        id: string;
        userId: string;
        role: UserRole;
      };
    }
  }
}

export function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.cookies?.[sessionCookieName];

  if (!token) {
    res.status(401).json({ code: 'SESSION_REQUIRED', message: 'Login session cookie is required.' });
    return;
  }

  try {
    const payload = verifyToken(token);
    req.authUser = {
      id: payload.id,
      userId: payload.userId,
      role: payload.role as UserRole
    };
    next();
  } catch {
    res.status(401).json({ code: 'INVALID_TOKEN', message: 'Session expired. Please login again.' });
  }
}

export function requireAdmin(req: Request, res: Response, next: NextFunction): void {
  if (req.authUser?.role !== 'Admin') {
    res.status(403).json({ code: 'ADMIN_REQUIRED', message: 'Admin access is required.' });
    return;
  }

  next();
}
