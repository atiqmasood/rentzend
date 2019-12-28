import { gql } from "apollo-server-express";

export const typeDefs = gql`
    type Query {
        agents: [Agent!]!
    }
    type Agent {
        id: ID,
        name: String!
        email: String!
        phone: String!
        address: String!
        zipcode: String!
    }
    type Mutation {
        createAgent(name: String!, email: String!, phone: String!, address: String!, zipcode: String!): Agent!
    }
`;