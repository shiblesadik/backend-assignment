import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar DateTime

  type Task {
    id: ID!
    title: String!
    status: String!
    listId: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateTaskInput {
    title: String!
    listId: String!
  }

  input UpdateTaskInput {
    title: String
    status: String
    listId: String
  }

  input ChangeTaskListInput {
    prevListId: String!
    curListId: String!
    curPosition: Int!
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    tasks: [Task!]!
    task(id: ID!): Task
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task!
    updateTask(id: ID!, input: UpdateTaskInput!): Task
    changeTaskList(id: ID!, input: ChangeTaskListInput!): Task
  }
`
