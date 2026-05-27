import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import { env } from './config/env';
import { requireDatabase } from './middleware/database.middleware';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { authRoutes } from './routes/auth.routes';
import { recordsRoutes } from './routes/records.routes';
import { usersRoutes } from './routes/users.routes';

export const app = express();

app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/auth', authRoutes);
app.use('/api/records', recordsRoutes);
app.use('/api/users', requireDatabase, usersRoutes);

app.use(notFoundHandler);
app.use(errorHandler);
