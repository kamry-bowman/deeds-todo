const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
const resolvers = require('./resolvers');
const { bindAuth, permissions } = require('./middleware');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const {
  PRISMA_ENDPOINT: endpoint,
  PRISMA_MANAGEMENT_API_SECRET: secret,
} = process.env;

const server = new GraphQLServer({
  typeDefs: './server/database/schema.graphql',
  resolvers,
  middlewares: permissions,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'server/database/generated/prisma.graphql',
      endpoint,
      secret,
    }),
  }),
  resolverValidationOptions: {
    requireResolversForResolveType: false,
  },
});

server.express.post(server.options.endpoint, bindAuth());
server.start(() =>
  console.log(`The server is running on port ${process.env.PORT || 4000}`)
);
