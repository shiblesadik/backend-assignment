import { gql } from 'apollo-server'

export const typeDefs = gql`
  scalar DateTime

  type Task {
    id: ID!
    title: String!
    status: String!
    index: Int!
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  type List {
    id: ID!
    title: String!
    index: Int!
    tasks: [Task!]
    createdAt: DateTime!
    updatedAt: DateTime!
  }

  input CreateListInput {
    title: String!
    index: Int!
  }

  input UpdateListInput {
    title: String
    index: Int
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
    deleteList(id: ID!): MutationResult!
  }
`
