const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const { rule, shield, and, or, not } = require('graphql-shield');

// returns an express middleware to verify jwt token and add user to req
// prior to request entering graphql processing
function bindAuth() {
  const {
    COGNITO_USER_POOL_ID: userPoolId,
    COGNITO_REGION: region,
  } = process.env;

  // console.log('line 9', region);

  const client = jwksClient({
    cache: true,
    jwksUri: `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`,
  });

  function getKey(header, callback) {
    client.getSigningKey(header.kid, function(err, key) {
      var signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
  }

  return async function authenticate(req, res, next) {
    // console.log(req.headers);
    const { authorization } = req.headers;
    if (authorization) {
      jwt.verify(authorization, getKey, {}, function(err, decoded) {
        // console.log(decoded);
        req.user = decoded;
      });
    }
    return next();
  };
}

const isAuthenticated = rule()(async (parent, args, ctx, info) => {
  console.log('args', args);
  return true;
});

// const isAdmin = rule()(async (parent, args, ctx, info) => {
//   return ctx.user.role === 'admin'
// })

// const isEditor = rule()(async (parent, args, ctx, info) => {
//   return ctx.user.role === 'editor'
// })

// Permissions

const permissions = shield({
  Query: {
    todos: isAuthenticated,
    todo: isAuthenticated,
  },
  Mutation: isAuthenticated,
});

module.exports = { bindAuth, permissions };
