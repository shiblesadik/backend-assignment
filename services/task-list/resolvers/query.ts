import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const query: Resolvers<Context>['Query'] = {
  taskLists: async (_parent, _args, ctx) => ctx.prisma.taskList.findMany(),
  taskList: async (_parent, { id }, ctx) =>
    ctx.prisma.taskList.findUnique({
      where: { id },
    }),
}
