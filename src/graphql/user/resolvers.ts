import UserService, { CreateUserPayload } from "../../services/user";

const queries = {
    getUserToken: async (_: any, payload: { email: string, password: string }) => {
        const token = await UserService.getUserToken({
            email: payload.email,
            password: payload.password
        });

        return token;
    }
}

const mutations = {
    createUser: async (_: any, payload: CreateUserPayload) => {
        const res = await UserService.createUser(payload);
        return res.id;
    }

    // createUser: async (
    //     _: any,
    //     {
    //         firstName,
    //         lastName,
    //         email,
    //         password
    //     }: {
    //         firstName: string,
    //         lastName: string,
    //         email: string,
    //         password: string
    //     }
    // ) => { return "randomid" }
}

export const resolvers = { queries, mutations };
