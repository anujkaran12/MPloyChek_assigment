import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export function requireDatabase(req: Request, res: Response, next: NextFunction): void {
  if (mongoose.connection.readyState === 1) {
    next();
    return;
  }

  res.status(503).json({
    code: 'DATABASE_NOT_CONNECTED',
    message: 'Database is not connected. Please start MongoDB and try again.',
    details: {
      route: req.originalUrl,
      mongoState: mongoose.connection.readyState
    }
  });
}
