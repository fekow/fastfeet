import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';
import User from '../models/user';

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Admin must be logged in.' });
  }
  const [, token] = authHeader.split(' ');

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;
    const isAdmin = await User.findByPk(decoded.id);
    if (isAdmin) {
      return next();
    }
    return res.status(401).json({ error: 'User is not admin' });
  } catch (err) {
    return res.status(401).json({ error: 'Token Invalid' });
  }
};
