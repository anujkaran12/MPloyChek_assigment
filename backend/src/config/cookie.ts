import { CookieOptions } from 'express';

export const sessionCookieName = 'mploychek_session';

export const sessionCookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: false,
  secure: false,
  maxAge: 8 * 60 * 60 * 1000,
  path: '/'
};
