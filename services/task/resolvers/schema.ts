import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar DateTime

  type Task {
    id: ID!
    title: String!
    status: String!
    listId: String
    index: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateTaskInput {
    title: String!
    status: String!
    listId: String
    index: Int!
  }

  input UpdateTaskInput {
    title: String
    status: String
    listId: String
    index: Int
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
