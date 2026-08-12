import { betterAuth } from 'better-auth';

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET || 'teahouse_super_secret_key_2027_auth_jwt_token_key',
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
  emailAndPassword: {
    enabled: true,
    autoSignIn: true
  }
});
