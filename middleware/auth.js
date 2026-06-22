const { expressjwt: expressJwt } = require('express-jwt');
const jwksRsa = require('jwks-rsa');

/**
 * Middleware that validates the JWT issued by Asgardeo / WSO2 API Manager.
 * The frontend attaches the Asgardeo access token as a Bearer token.
 * WSO2 API Manager Gateway also validates this before forwarding to the backend,
 * but we do a second validation here for defence-in-depth.
 */
const validateJwt = expressJwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 10,
    jwksUri: process.env.JWKS_URI,
  }),
  audience: process.env.JWT_AUDIENCE,
  issuer: process.env.JWT_ISSUER,
  algorithms: ['RS256'],
});

module.exports = { validateJwt };
