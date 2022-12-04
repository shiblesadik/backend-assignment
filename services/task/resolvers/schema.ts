import { gql } from 'apollo-server'

export const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    status: String!
  }

  input CreateTaskInput {
    title: String!
    status: String!
    assignToUserId: String!
    taskListId: String!
  }

  input UpdateTaskInput {
    title: String
    status: String
    assignToUserId: String
    taskListId: String
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
    deleteTask(id: ID!): MutationResult!
  }
`