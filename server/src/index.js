import { ApolloServer } from "apollo-server-express";
import express from "express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import { typeDefs } from "./typeDefs";

const startServer = async () => {

    const app = express();

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: {
            endpoint: '/graphql'
        }
    });


    mongoose.Promise = global.Promise;
    await mongoose.connect("mongodb://127.0.0.1:27017/test3", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    }).then(() => console.log('DB Connected!'))
        .catch(err => {
            console.log('db connection err', err);
        });

    server.applyMiddleware({ app });
    app.listen({ port: 5000 }, () =>
        console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`)
    );
};

startServer();