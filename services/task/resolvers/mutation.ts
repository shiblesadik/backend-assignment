import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTask: async (_parent, { input }, ctx) =>
    ctx.prisma.task.create({ data: input }),
  updateTask: async (_parent, { id, input }, ctx) => {
    // if (input.listId) {
    //   const prevTask = await ctx.prisma.task.findUnique({ where: { id } });
    //   if (prevTask?.listId && prevTask?.listId != input.listId) {
    //     const prevList = await ctx.prisma.list.findUnique({ where: { id: prevTask?.listId } });
    //     const newTasksOrder: [] = prevList.tasksOrder;
    //     const index = newTasksOrder.findIndex(id => id === prevTask?.listId);
    //     if (index > -1) {
    //         newTasksOrder.splice(index, 1);
    //     }
    //     await ctx.prisma.list.update({
    //       where: {id: prevTask?.listId},
    //       data: {
    //         tasksOrder: {
    //           set: newTasksOrder,
    //         },
    //       },
    //     });
    //   }
    // }
    return ctx.prisma.task.update({
      where: { id },
      data: {
        title: input.title ?? undefined,
        status: input.status ?? undefined,
        listId: input.listId ?? undefined,
      },
    });
  }
}
