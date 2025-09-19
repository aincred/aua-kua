import { jwtVerify } from 'jose';

export async function validateToken(token: string): Promise<{ email: string; role: string }> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload as { email: string; role: string };
  } catch {
    throw new Error('Invalid token');
  }
}