import { createHmac, randomBytes } from "crypto";
import { prismaClient } from "../lib/db";
// import { Jwt } from "jsonwebtoken";
import Jwt from "jsonwebtoken";

export interface CreateUserPayload {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
}

export interface GetUserTokenPayload {
    email: string;
    password: string;
}

class UserService {
    public static createUser(payload: CreateUserPayload) {
        const { firstName, lastName, email, password } = payload;
        const salt = randomBytes(32).toString("hex");
        // const salt = randomBytes(32).toString();
        // const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");

        const hashedPassword = UserService.generateHash(salt, password);

        return prismaClient.user.create({
            data: {
                firstName,
                lastName,
                email,
                salt,
                // password: createHmac("sha256", salt).update(password).digest("hex"),
                password: hashedPassword
            }
        });
    }

    private static getUserByEmail(email: string) {
        return prismaClient.user.findUnique({
            where: {
                email
            }
        });
    }

    private static generateHash(salt: string, password: string) {
        const hashedPassword = createHmac("sha256", salt).update(password).digest("hex");

        return hashedPassword;
    }

    public static async getUserToken(payload: GetUserTokenPayload) {
        const { email, password } = payload;

        const user = await UserService.getUserByEmail(email);
        if (!user) throw new Error("user not found!");    // this will throw an 404 error

        const userSalt = user.salt;
        const userHashedPassword = UserService.generateHash(userSalt, password);

        if (userHashedPassword !== user.password) throw new Error("incorrect password!");

        // Generate a Token   -> JWT(Json Web Token)
    }
}

export default UserService;