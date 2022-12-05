import { Resolvers, Task } from 'generated/types'
import { Context } from '../../../libs/context'

export const query: Resolvers<Context>['Query'] = {
  lists: async (_parent, _args, ctx) => {
    const lists = await ctx.prisma.list.findMany({ include: { tasks: true } });
    for (let i = 0; i < lists.length; ++i) {
      const list = lists[i] as any;
      const tasks = [];
      for (let j = 0; j < list?.tasksOrder.length; ++j) {
        const task = list?.tasks.find((task: any) => task.id == list?.tasksOrder[j]);
        tasks.push(task);
      }
      list['tasks'] = tasks;
    }
    return lists;
  },
  list: async (_parent, { id }, ctx) =>
    ctx.prisma.list.findUnique({
      where: { id },
      include: { tasks: true },
    }).then((list: any) => {
      const tasks = [];
      for (let i = 0; i < list?.tasksOrder.length; ++i) {
        const task = list?.tasks.find((task: any) => task.id == list?.tasksOrder[i]);
        tasks.push(task);
      }
      list['tasks'] = tasks;
      return list;
    }),
}
