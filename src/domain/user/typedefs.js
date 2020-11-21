import { gql } from 'apollo-server-express'

const typeDefs = gql`
  extend type Query {
    user(id: ID, username: String): User
    login(username: String, password: String) : User
  }
  extend type Mutation {
    register(username: String, password: String) : User
    profile(id: ID!, profile: ProfileInput) : User
  }
  type User {
    id: ID
    active: Boolean
    token: String
    profile: UserProfile
  }
  type UserProfile {
    name: String
    birthday: Date
    status: String
  }
  input ProfileInput {
    name: String
    birthday: Date
    status: String
  }
`

module.exports = typeDefs
