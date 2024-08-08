import { Request, Response, NextFunction } from 'express';

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    // console.log('Auth.ts User ID Verified: ', req.user?.id);
    // console.log('Auth.ts User Obj Verified: ', req.user);
    return next();
  }
  return res.redirect('/');
};

export default isAuthenticated;
