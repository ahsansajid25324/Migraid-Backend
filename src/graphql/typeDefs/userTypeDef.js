const { gql } = require('graphql-tag');

const userTypeDef = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
  }

  type RegisterResponse {
    success: Boolean!
    message: String!
    user: User
  }

   type LoginResponse {
    success: Boolean!
    message: String!
    token: String
    user: User
  }

  type Query {
    user(id: ID!):User
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): RegisterResponse
    login(email: String!, password: String!): LoginResponse

  }
`;

module.exports = userTypeDef;
