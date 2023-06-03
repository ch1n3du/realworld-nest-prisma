import * as bcrypt from 'bcrypt';
import { decode, sign, verify } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
export const JWT_SECRET: string = process.env.JWT_SECRET!;
const saltRounds = 20;

export async function hashPassword(rawPassword: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(rawPassword, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(
  rawPassword: string,
  hashedPassword: string,
): Promise<boolean> {
  return bcrypt.compare(rawPassword, hashedPassword);
}

export async function generateAccessToken(userId: string): Promise<string> {
  return sign(userId, JWT_SECRET, { expiresIn: '1800s' });
}

export async function verifyAccessToken(jwt: string) {
  return verify(jwt, JWT_SECRET);
}

export async function decodeAccessToken(token: string): Promise<string> {
  return decode(token) as string;
}
