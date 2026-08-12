"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const better_auth_1 = require("better-auth");
exports.auth = (0, better_auth_1.betterAuth)({
    secret: process.env.BETTER_AUTH_SECRET || 'teahouse_super_secret_key_2027_auth_jwt_token_key',
    baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:5000',
    emailAndPassword: {
        enabled: true,
        autoSignIn: true
    }
});
