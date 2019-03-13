const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');
const bindMiddlewares = require('./middleware');
require('dotenv').config();

const {
  PRISMA_ENDPOINT: endpoint,
  PRISMA_MANAGEMENT_API_SECRET: secret,
} = process.env;

const middlewares = bindMiddlewares();
console.log(middlewares);

const server = new GraphQLServer({
  typeDefs: './server/database/schema.graphql',
  resolvers,
  middlewares,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'server/database/generated/prisma.graphql',
      endpoint,
      secret,
      debug: false,
    }),
  }),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

server.start(() =>
  console.log(`The server is running on http://localhost:4000`)
);
