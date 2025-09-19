import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!; // store in .env.local
const JWT_EXPIRES_IN = '1h';

export function signToken(payload: object) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
