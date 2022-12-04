import { gql } from 'apollo-server'

export const typeDefs = gql`
  type TaskList {
    id: ID!
    title: String!
    slug: String!
  }

  input CreateTaskListInput {
    title: String!
    slug: String!
  }

  input UpdateTaskListInput {
    title: String
    slug: String
  }

  type MutationResult {
    success: Boolean!
  }

  type Query {
    taskLists: [TaskList!]!
    taskList(id: ID!): TaskList
  }

  type Mutation {
    createTaskList(input: CreateTaskListInput!): TaskList!
    updateTaskList(id: ID!, input: UpdateTaskListInput!): TaskList
    deleteTaskList(id: ID!): MutationResult!
  }
`
