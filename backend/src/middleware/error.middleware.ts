import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';

export function notFoundHandler(req: Request, res: Response): void {
  res.status(404).json({
    code: 'ROUTE_NOT_FOUND',
    message: `No API route found for ${req.method} ${req.originalUrl}.`
  });
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction): void {
  console.error(error);

  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({ code: 'INVALID_JSON', message: 'Request body is not valid JSON.' });
    return;
  }

  if (error instanceof mongoose.Error.CastError) {
    res.status(400).json({ code: 'INVALID_ID', message: 'Invalid request id.' });
    return;
  }

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: 'Request data failed validation.',
      details: Object.values(error.errors).map((fieldError) => fieldError.message)
    });
    return;
  }

  if (error.name === 'MongoServerError' && 'code' in error && error.code === 11000) {
    res.status(409).json({
      code: 'DUPLICATE_VALUE',
      message: 'Duplicate value found. Please use a unique User ID.'
    });
    return;
  }

  if (error.name === 'MongooseServerSelectionError') {
    res.status(503).json({
      code: 'DATABASE_NOT_REACHABLE',
      message: 'MongoDB is not reachable. Please verify MongoDB is running and the MONGO_URI is correct.'
    });
    return;
  }

  res.status(500).json({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Something went wrong. Please try again later.'
  });
}
