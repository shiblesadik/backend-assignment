import { startGateway } from './gateway'
import { startServer as startUserServer } from './services/user'
import { startServer as startTaskServer } from './services/task'
import { startServer as startTaskListServer } from './services/task-list'

async function bootstrap() {
  await Promise.all([startUserServer(), startTaskServer(), startTaskListServer()])

  await startGateway()
}

bootstrap()
