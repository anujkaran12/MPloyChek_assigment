import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { IUser } from '../models/User';

export interface TokenPayload {
  id: string;
  userId: string;
  role: string;
}

export function signToken(user: IUser): string {
  return jwt.sign(
    {
      id: user.id,
      userId: user.userId,
      role: user.role
    },
    env.jwtSecret,
    { expiresIn: '8h' }
  );
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, env.jwtSecret) as TokenPayload;
}
