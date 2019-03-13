module.exports = {
  Query: {
    todos(parent, args, ctx, info) {
      return ctx.db.query.todoes({}, info);
    },
    todo(parent, args, ctx, info) {
      return ctx.db.query.todoes({ where: { id: args.id } }, info);
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
