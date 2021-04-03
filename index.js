const { ApolloServer, gql } = require("apollo-server");
const {
  buildFederatedSchema
} = require("@apollo/federation");
const cats = require("./cats.json");

const typeDefs = gql`
  type Cat {
    id: ID!
    name: String!
    weight: Float!
    photo: Photo!
  }

  type Photo {
    full: String!
    thumb: String!
  }

  type Query {
    allCats: [Cat!]!
    catCount: Int!
  }
`;
const resolvers = {
  Query: {
    allCats: () => cats,
    catCount: () => cats.length
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
});

server.listen().then(({ url }) => {
  console.log(`🐱 Cat Service running at ${url}`);
});
