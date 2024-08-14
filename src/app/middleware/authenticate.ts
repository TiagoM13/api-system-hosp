import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../app";
import { UserType } from "@shared/entities";
import z from "zod";

interface UserPayload {
    id: number;
    name: string;
    email: string;
    user_type: string;
    status: string;
}

export const verifyToken = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const token = req.headers.authorization;

        // if (req.headers.user_type !== UserType.ADMIN) {
        //     return res.status(403).send({ error: "Access forbidden: Admins only" });
        // }

        if (!token) {
            return res.status(401).send({ message: "Token not provided" });
        }

        const decoded = app.jwt.verify<UserPayload>(token);

        return req.user = decoded;
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes('expired')) {
                return res.status(401).send({ message: "Token has expired" });
            }
        }

        return res.status(401).send({ message: "Invalid token" });
    }
};

export const verifyAdmin = async (req: FastifyRequest, res: FastifyReply) => {
    const schemaUser = z.object({
        id: z.coerce.number().int(),
        user_type: z.nativeEnum(UserType)
    })

    const { user_type } = schemaUser.parse(req.user)

    if (user_type !== UserType.ADMIN) {
        return res.status(403).send({ error: "Access forbidden: Admins only" });
    }
};
