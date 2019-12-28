import { Agent } from "./models/Agent";

export const resolvers = {
    Query: {
        agents: () => Agent.find(),
    },
    Mutation: {
        createAgent: async (_, { name, email, phone, address, zipcode }) => {
            const agent = new Agent({ name, email, phone, address, zipcode });
            await agent.save();
            return agent;
        }
    },
};