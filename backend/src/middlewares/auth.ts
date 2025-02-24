import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { CustomRequest } from '../types/express';

interface TokenPayload {
  id: number;
  email: string;
}

export default function authMiddleware(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  const token = authorization.replace('Bearer', '').trim();

  try {
    const data = jwt.verify(token, process.env.JWT_SECRET as string);
    const { id, email } = data as TokenPayload;

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido' });
  }
} 