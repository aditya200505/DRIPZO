import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const getCookieToken = (req) => {
  const rawCookies = req.headers.cookie || '';
  const cookies = rawCookies.split(';').reduce((acc, cookie) => {
    const parts = cookie.split('=');
    if (parts.length >= 2) {
      acc[parts[0].trim()] = parts.slice(1).join('=').trim();
    }
    return acc;
  }, {});
  return cookies['token'];
};

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else {
    token = getCookieToken(req);
  }

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findByPk(decoded.id);
      return next();
    } catch (error) {
      console.error('JWT verification error in protect middleware:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  return res.status(401).json({ message: 'Not authorized, no token' });
};
