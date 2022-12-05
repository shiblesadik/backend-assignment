import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTask: async (_parent, { input }, ctx) => {
    const list = await ctx.prisma.list.findUnique({
      where: { id: input.listId },
    });

    if (!list) {
      throw new Error("Task List Not Found");
    }

    const task = await ctx.prisma.task.create({ data: input });

    await ctx.prisma.list.update({
      where: { id: input.listId },
      data: {
        tasksOrder: {
          set: [...list?.tasksOrder, task?.id],
        },
      },
    });

    return task;
  },
  updateTask: async (_parent, { id, input }, ctx) => {
    return ctx.prisma.task.update({
      where: { id },
      data: {
        title: input.title ?? undefined,
        status: input.status ?? undefined,
        listId: input.listId ?? undefined,
      },
    });
  },
  changeTaskList: async (_parent, { id, input }, ctx) => {
    const prevList = await ctx.prisma.list.findUnique({
      where: { id: input.prevListId },
    });

    if (!prevList) {
      throw new Error("Previous Task List Not Found");
    }

    const prevTasksOrder = prevList?.tasksOrder as [];

    const prevIndex = prevTasksOrder?.findIndex(taskId => taskId == id);
    if (prevIndex > -1) {
      prevTasksOrder.splice(prevIndex, 1);

      await ctx.prisma.list.update({
        where: { id: input.prevListId },
        data: {
          tasksOrder: {
            set: prevTasksOrder,
          },
        },
      });
    } else {
      throw new Error("Task Not Found in Previous List");
    }

    const curList = await ctx.prisma.list.findUnique({
      where: { id: input.curListId },
    });

    if (!curList) {
      throw new Error("Current Task List Not Found");
    }

    const curTasksOrder = curList?.tasksOrder as any;

    curTasksOrder?.splice(input.curPosition, 0, id);

    await ctx.prisma.list.update({
      where: { id: input.curListId },
      data: {
        tasksOrder: {
          set: curTasksOrder,
        },
      },
    });

    return ctx.prisma.task.update({
      where: { id },
      data: {
        listId: input.curListId,
      },
    });
  },
}
