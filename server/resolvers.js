module.exports = {
  Query: {
    todos(parent, { username }, ctx, info) {
      return ctx.db.query.todoes({}, info);
    },
    todo(parent, args, ctx, info) {
      return ctx.db.query.todoes({ where: { id: args.id } }, info);
    },
    user(parent, { id, username }, ctx, info) {
      if (id) {
        return ctx.db.query.user({ where: { id } }, info);
      } else {
        return ctx.db.query.user({ where: { username } });
      }
    },
    users(parent, {}, ctx, info) {
      return ctx.db.query.users({}, info);
    },
  },
  Mutation: {
    createUser(parent, { username }, ctx, info) {
      return ctx.db.mutation.createUser(
        {
          data: {
            username,
          },
        },
        info
      );
    },
    createTodo(parent, { title, description, username }, ctx, info) {
      return ctx.db.mutation.createTodo({
        data: {
          title,
          description,
          user: {
            connect: {
              username,
            },
          },
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
