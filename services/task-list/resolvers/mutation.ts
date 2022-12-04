import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const mutation: Resolvers<Context>['Mutation'] = {
  createTaskList: async (_parent, { input }, ctx) =>
    ctx.prisma.taskList.create({ data: input }),
  updateTaskList: async (_parent, { id, input }, ctx) =>
    ctx.prisma.taskList.update({
      where: { id },
      data: {
        title: input.title ?? undefined,
        slug: input.slug ?? undefined,
      },
    }),
}
