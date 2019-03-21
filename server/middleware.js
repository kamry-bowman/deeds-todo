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

const isAuthorized = rule()(async (parent, { username, id }, ctx, info) => {
  // console.log(username);
  // console.log(ctx.request.user);

  // logic for searches based on username
  // if (username && username !== ctx.request.user.id) {
  //   return false;
  // }

  // logic for searches for todos
  // ctx.db.exists
  //   .Todo({ id, user: { username: ctx.request.user } })
  //   .then(console.log);

  return true;
});

const permissions = shield({
  Query: {
    todos: isAuthorized,
    todo: isAuthorized,
  },
  Mutation: {
    createTodo: isAuthorized,
    deleteCompletedTodos: isAuthorized,
  },
});

module.exports = { bindAuth, permissions };
