const axios = require('axios');
const NodeCache = require('node-cache');

module.exports = function() {
  const {
    COGNITO_USER_POOL_ID: userPoolId,
    COGNITO_REGION: region,
  } = process.env;

  const cache = new NodeCache({ stdTTL: 10000, checkperiod: 1000 });

  async function updateJwks() {
    try {
      console.log('server hit');
      const { data } = await axios.get(
        `https://cognito-idp.${region}.amazonaws.com/${userPoolId}/.well-known/jwks.json`
      );
      if (data) {
        cache.set('jwks', data);
        return data;
      }
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  updateJwks();

  const authenticate = async (resolve, root, args, ctx, info) => {
    let jwks;
    try {
      jwks = cache.get('jwks');
      console.log(jwks);
    } catch (err) {
      jwks = await updateJwks();
    }
    return resolve(root, args, ctx, info);
  };

  return [authenticate];
};
