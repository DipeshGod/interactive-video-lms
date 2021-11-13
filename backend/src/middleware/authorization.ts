import { NextFunction } from 'express';

const isSuperAdmin = (req: any, res: any, next: NextFunction) => {
  if (req.loggedInUser?.type === 'superAdmin') return next();

  return res.status(401).json({
    message: 'Your are not authorize to access this page',
  });
};

const isEnterprise = (req: any, res: any, next: NextFunction) => {
  if (req.loggedInUser?.type === 'enterprise') return next();

  return res.status(401).json({
    message: 'Your are not authorize to access this page',
  });
};

const isStudent = (req: any, res: any, next: NextFunction) => {
  if (req.loggedInUser?.type === 'student') return next();

  return res.status(401).json({
    message: 'Your are not authorize to access this page',
  });
};

export { isSuperAdmin, isEnterprise, isStudent };
