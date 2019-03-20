module.exports = {
  Query: {
    todos(parent, { username }, ctx, info) {
      return ctx.db.query.todoes({ where: { user: { username } } }, info);
    },
    todo(parent, args, ctx, info) {
      return ctx.db.query.todo({ where: { id: args.id } }, info);
    },
    user(parent, { id, username }, ctx, info) {
      if (id) {
        return ctx.db.query.user({ where: { id } }, info);
      } else {
        return ctx.db.query.user({ where: { username }, info });
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
    async createTodo(parent, { title, description, username }, ctx, info) {
      const data = await ctx.db.mutation.createTodo(
        {
          data: {
            title,
            description,
            user: {
              connect: {
                username: username,
              },
            },
          },
        },
        info
      );
      return data;
    },
    deleteTodo(parent, { id }, ctx, info) {
      return ctx.db.mutation.deleteTodo({ where: { id } }, info);
    },
    deleteCompletedTodos(parent, { username }, ctx, info) {
      return ctx.db.mutation
        .deleteManyTodoes(
          {
            where: {
              user: { username },
              completed: true,
            },
          },
          info
        )
        .then(() => {
          return ctx.db.query.todoes({ where: { user: { username } } }, info);
        });
    },
    updateTodo(parent, { id, ...changes }, ctx, info) {
      return ctx.db.mutation.updateTodo(
        {
          where: { id },
          data: changes,
        },
        info
      );
    },
  },
};
