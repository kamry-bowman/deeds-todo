module.exports = {
  Query: {
    todos(parent, { userId }, ctx, info) {
      // console.log(ctx.request.user);
      return ctx.db.query.todoes({}, info);
    },
    todo(parent, args, ctx, info) {
      return ctx.db.query.todoes({ where: { id: args.id } }, info);
    },
  },
  Mutation: {
    createUser(parent, { name, id }, ctx, info) {
      return ctx.db.mutation.createUser({
        data: {
          name,
          id,
        },
      });
    },
    createTodo(parent, { title, description, userId }, ctx, info) {
      return ctx.db.mutation.createTodo({
        data: {
          title,
          description,
          user: {
            id: userId,
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
