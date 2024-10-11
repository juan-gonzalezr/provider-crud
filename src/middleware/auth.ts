import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
const token = req.header('Authorization')?.split(' ')[1];
  console.log("ingreasa", token);
  if (!token) {
    res.status(401).json({ message: 'Access deniedddddd' });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET!) as string | JwtPayload;
    (req as Request & { user: any }).user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};
