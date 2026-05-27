import dotenv from 'dotenv';

dotenv.config();

export const env = {
  mongoUri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/mploycheck_assignment',
  jwtSecret: process.env.JWT_SECRET || 'mploycheck-local-secret',
  port: Number(process.env.PORT || 5000),
  clientOrigin: process.env.CLIENT_ORIGIN || 'http://localhost:4200'
};
