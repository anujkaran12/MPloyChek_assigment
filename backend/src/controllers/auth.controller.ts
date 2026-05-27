import { NextFunction, Request, Response } from 'express';
import { sessionCookieName, sessionCookieOptions } from '../config/cookie';
import { User } from '../models/User';
import { signToken } from '../utils/token';

export async function login(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { userId, password, role } = req.body;

    if (!userId || !password || !role) {
      res.status(400).json({ code: 'MISSING_LOGIN_FIELDS', message: 'User ID, password, and role are required.' });
      return;
    }

    if (!['Admin', 'General User'].includes(role)) {
      res.status(400).json({ code: 'INVALID_ROLE', message: 'Role must be Admin or General User.' });
      return;
    }

    const user = await User.findOne({ userId: String(userId).toLowerCase(), role });

    if (!user || user.status !== 'Active' || !(await user.comparePassword(password))) {
      res.status(401).json({ code: 'INVALID_LOGIN', message: 'Invalid credentials or role selection.' });
      return;
    }

    user.lastLoginAt = new Date();
    await user.save();

    res.cookie(sessionCookieName, signToken(user), sessionCookieOptions);

    res.json({
      user: user.toJSON()
    });
  } catch (error) {
    next(error);
  }
}

export async function me(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const user = await User.findById(req.authUser?.id);

    if (!user || user.status !== 'Active') {
      res.status(401).json({ code: 'USER_INACTIVE', message: 'User is no longer active.' });
      return;
    }

    res.json({ user: user.toJSON() });
  } catch (error) {
    next(error);
  }
}

export function logout(_req: Request, res: Response): void {
  res.clearCookie(sessionCookieName, sessionCookieOptions);
  res.json({ message: 'Logged out successfully.' });
}
