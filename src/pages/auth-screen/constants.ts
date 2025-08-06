export const AUTH_PASSWORD_HASH =
  '0f020ad788d9274eb34f502e6b120f06cde53ac106c5ebdffcd21dafb243c53f2b3483b81a2b16a25a1bc5f30e35ca2e3f75b5ea1edf25f4ec8a5813f5fe9961';

export const AUTH_PASSWORD_SALT = 'salt';

export const AUTH_PASSWORD_ITERATIONS = 10000;

export const AUTH_PASSWORD_KEY_LENGTH = 64;

export async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-512', data);
  const hash = Array.from(new Uint8Array(hashBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
  return hash;
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  const hashedPassword = await hashPassword(password);
  return hashedPassword === hash;
}
