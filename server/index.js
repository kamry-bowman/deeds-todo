const { GraphQLServer } = require('graphql-yoga');
const { Prisma } = require('prisma-binding');
require('dotenv').config();

const {
  PRISMA_ENDPOINT: endpoint,
  PRISMA_MANAGEMENT_API_SECRET: secret,
} = process.env;

const resolvers = {
  Query: {
    todos(parent, args, ctx, info) {
      return ctx.db.query.todos({}, info);
    },
    todo(parent, args, ctx, info) {
      return ctx.db.query.todo({ where: { id: args.id } }, info);
    },
  },
  Mutation: {
    createTodo(parent, { title, description }, ctx, info) {
      return ctx.db.mutation.createTodo({
        data: {
          title,
          description,
        },
      });
    },
    deleteTodo(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteTodo({ where: { id } }, info);
    },
    updateTodo(parent, { id, ...changes }, ctx, info) {
      return ctx.db.mutation.updateTodo({
        where: { id },
        data: changes,
      });
    },
  },
};

const server = new GraphQLServer({
  typeDefs: './server/database/schema.graphql',
  resolvers,
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

server.start(() =>
  console.log(`The server is running on http://localhost:4000`)
);
