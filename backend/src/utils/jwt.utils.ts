import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  role: 'user' | 'agency' | 'admin';
}

export const generateToken = (payload: TokenPayload): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET || 'h5M91OOxhZcPyHZwE66Qr2m/sxOfzxUI+4BfqVtQjImwKA7EAUKQ4qKYFhTk9odmsxd9HUX/gayiRPGCIr6FEg==',
    { expiresIn: '24h' }
  );
};

function asyncHandler(fn: (req: Request, res: Response, next: Function) => Promise<any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
} 