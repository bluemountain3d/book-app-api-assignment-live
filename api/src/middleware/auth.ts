import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.accessToken === undefined) {
    res.sendStatus(401)
    return;
  }
  jwt.verify(req.cookies.accessToken, process.env.JWT_SECRET as string, function(error: jwt.VerifyErrors | null) { // Fixed typo in "acessToken"
    if (error) {
      res.status(403).json({ message: 'You have to be logged in to use this feature' });
      return;
    }
    next();
  });
};