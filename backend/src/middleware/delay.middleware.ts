import { NextFunction, Request, Response } from 'express';

export function applyDelay(req: Request, _res: Response, next: NextFunction): void {
  const delay = Math.min(Number(req.query.delay || 0), 8000);

  if (!Number.isFinite(delay) || delay <= 0) {
    next();
    return;
  }

  setTimeout(next, delay);
}
