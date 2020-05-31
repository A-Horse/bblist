export interface Claims {
  userId: string;
  username: string;
  email: string;
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  sub: string;
}
