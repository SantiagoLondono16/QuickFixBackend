export interface TokenPayload {
  token: string;
  expiresAt: string;
  user: { id: string; email: string };
}

export interface TokenRepository {
  generate(id: string, email: string): TokenPayload;
  verify(token: string): boolean;
}

export const TokenRepository = Symbol("TokenRepository");
