import { Resolvers } from 'generated/types'
import { Context } from '../../../libs/context'

export const query: Resolvers<Context>['Query'] = {
  lists: async (_parent, _args, ctx) =>
    (await ctx.prisma.list.findMany({ include: { tasks: true } })).sort(
      (a, b) => (a.index >= b.index ? 1 : -1)
    ),
  list: async (_parent, { id }, ctx) =>
    ctx.prisma.list.findUnique({
      where: { id },
      include: { tasks: true },
    }),
}
