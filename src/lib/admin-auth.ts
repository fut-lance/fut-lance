import { createHmac, timingSafeEqual } from 'node:crypto';

export const ADMIN_COOKIE = 'futlance_admin';

function getSecret(): string | null {
  return process.env.ADMIN_TRANSMISSOES_PASSWORD || null;
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export function isAdminConfigured(): boolean {
  return getSecret() !== null;
}

export function verifyPassword(input: string): boolean {
  const secret = getSecret();
  if (!secret || !input) return false;
  return safeEqual(input, secret);
}

export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  return createHmac('sha256', secret).update('futlance-admin-session').digest('hex');
}

export function verifySessionToken(token: string | undefined | null): boolean {
  const expected = createSessionToken();
  if (!expected || !token) return false;
  return safeEqual(token, expected);
}
