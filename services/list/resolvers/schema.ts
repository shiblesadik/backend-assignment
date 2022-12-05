import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar DateTime

  type Task {
    id: ID!
    title: String!
    status: String!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type List {
    id: ID!
    title: String!
    tasks: [Task!]
    tasksOrder: [String!]!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateListInput {
    title: String!
  }

  input UpdateListInput {
    title: String
  }

  input UpdateTasksOrderInput {
    taskId: String!
    index: Int!
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    lists: [List!]!
    list(id: ID!): List
  }

  type Mutation {
    createList(input: CreateListInput!): List!
    updateList(id: ID!, input: UpdateListInput!): List
    updateTasksOrder(id: ID!, input: UpdateTasksOrderInput!): List
    deleteList(id: ID!): MutationResult!
  }
`
