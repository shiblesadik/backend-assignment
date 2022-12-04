import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createList: async (_parent, { input }, ctx) =>
    ctx.prisma.list.create({ data: input }),
  updateList: async (_parent, { id, input }, ctx) =>
    ctx.prisma.list.update({
      where: { id },
      data: {
        title: input.title ?? undefined,
      },
    }),
  updateTasksOrder: async (_parent, { id, input }, ctx) => {
    const prevList = await ctx.prisma.list.findUnique({
      where: { id },
    });
    const tasksOrder = prevList?.tasksOrder;
    const index = tasksOrder.findIndex(id => id == input.taskId);
    if (index > -1) {
      tasksOrder.splice(index, 1);
      tasksOrder.splice(input.index, 0, input.taskId);
    }

    return ctx.prisma.list.update({
      where: { id },
      data: {
        tasksOrder: {
          set: tasksOrder,
        },
      },
    });
  },
}
