import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4'

async function init() {
    const app = express();
    const PORT = Number(process.env.PORT) || 8000;
    app.use(express.json());

    // GraphQL Server
    const gqlServer = new ApolloServer({
        typeDefs: ``,      // Schema
        resolvers: {},    // actual Function/ Buisness Logic
    });

    // Starting GQL Server
    await gqlServer.start();

    app.get('/', (req, res) => {
        res.json({
            message: 'Server is up and Running'
        });
    });

    app.use('/graphql', expressMiddleware(gqlServer));

    app.listen(PORT, () => {
        console.log(`Server started on PORT: ${PORT}`);
    });
}

init();