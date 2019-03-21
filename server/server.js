const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');
const { bindAuth, permissions } = require('./middleware');

const {
  PRISMA_ENDPOINT: endpoint,
  PRISMA_MANAGEMENT_API_SECRET: secret,
} = process.env;

console.log(endpoint);

const server = new GraphQLServer({
  mocks: process.env.NODE_ENV === 'test',
  typeDefs: './server/database/schema.graphql',
  resolvers,
  middlewares: permissions,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'server/database/generated/prisma.graphql',
      endpoint,
      secret,
      debug: true,
    }),
  }),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

server.express.post(server.options.endpoint, bindAuth());
module.exports = { server };
