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

  type Query {
    users: [User]
  }

  type Mutation {
    register(firstName: String!, lastName: String!, email: String!, password: String!): RegisterResponse
  }
`;

module.exports = userTypeDef;
