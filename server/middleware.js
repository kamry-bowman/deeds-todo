const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');
const { rule, shield } = require('graphql-shield');

// returns an express middleware to verify jwt token and add user to req
// prior to request entering graphql processing
function bindAuth() {
  const {
    COGNITO_USER_POOL_ID: userPoolId,
    COGNITO_REGION: region,
  } = process.env;

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
      return jwt.verify(authorization, getKey, {}, function(err, decoded) {
        if (err) {
          return res.status(401).json({ message: 'Not authorized' });
        }
        req.user = decoded;
        return next();
      });
    }
    return res.status(401).json({ message: 'Not authorized' });
  };
}

const idAuthorized = rule()((parent, { id }, ctx, info) => {
  if (!id) {
    return false;
  }

  return ctx.db.exists
    .Todo({ id, user: { username: ctx.request.user.username } })
    .catch(res => {
      console.log(res);
      return false;
    });
});

const usernameAuthorized = rule()((parent, { username }, ctx, info) => {
  return username && username === ctx.request.user.username;
});

const permissions = shield({
  Query: {
    todos: usernameAuthorized,
    todo: idAuthorized,
    user: usernameAuthorized,
  },
  Mutation: {
    createUser: usernameAuthorized,
    createTodo: usernameAuthorized,
    deleteTodo: idAuthorized,
    deleteCompletedTodos: usernameAuthorized,
    updateTodo: idAuthorized,
  },
});

module.exports = { bindAuth, permissions };
