import { ApolloServer } from 'apollo-server'
import { createGqlServer } from '../../libs/server'
import { resolvers } from './resolvers'
import { typeDefs } from './resolvers/schema'

export async function startServer(): Promise<void> {
  const server = await createGqlServer({
    typeDefs,
    resolvers,
  })

  const { url } = await server.listen(Number(process.env.TASK_LIST_SERVICE_PORT))

  console.log(`TaskList service running at ${url}`)
}
