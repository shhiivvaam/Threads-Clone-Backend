import { ApolloServer } from "@apollo/server";
import { User } from "./user";
async function createApolloGraphqlServer() {
    const gqlServer = new ApolloServer({
        typeDefs: `
            ${User.typeDefs}
            type Query {
                ${User.queries}
            }
            type Mutation {
                ${User.mutations}
            }
        `,     // Schema
        // getContext: String
        resolvers: {
            Query: {
                ...User.resolvers.queries,
                // getContext: (_: any, parameters: any, context) => {
                //     console.log('context', context);
                //     return "Okay";
                // }
            },
            Mutation: {
                ...User.resolvers.mutations
            },
        },    // actual Function/ Buisness Logic
    });

    // Starting GQL Server
    await gqlServer.start();

    return gqlServer;
}

export default createApolloGraphqlServer;