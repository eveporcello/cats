import { ApolloServer } from "@apollo/server";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

import cats from "./cats.json" assert { type: "json" };

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

const PORT = process.env.PORT || 4001;

async function startApolloServer() {
  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs,
      resolvers
    })
  });
  const { url } = await startStandaloneServer(server, {
    listen: { port: PORT }
  });
  console.log(`Service running at ${url}`);
}

startApolloServer();
