const { makeExecutableSchema } = require('@graphql-tools/schema');
const userTypeDefs = require('./typeDefs/userTypeDef');  
const userResolvers = require('./resolvers/userResolver');  

const schema = makeExecutableSchema({
  typeDefs: userTypeDefs,  
  resolvers: userResolvers,  
});

module.exports = schema;
