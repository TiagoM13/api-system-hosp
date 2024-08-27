import { FastifyReply, FastifyRequest } from "fastify";
import { app } from "../app";
import z from "zod";

interface UserPayload {
    id: number;
    role: number;
    status: string;
}

export const verifyToken = async (req: FastifyRequest, res: FastifyReply) => {
    try {
        const token = req.headers.authorization;

        if (!token) {
            return res.status(401).send({ message: "Token não fornecido" });
        }

        const decoded = app.jwt.verify<UserPayload>(token);

        return req.user = decoded;
    } catch (err) {
        if (err instanceof Error) {
            if (err.message.includes('expired')) {
                return res.status(401).send({ message: "O token expirou" });
            }
        }

        return res.status(401).send({ message: "Token inválido" });
    }
};

export const checkPermissions = (roleIds: number[]) => {
    return async (req: FastifyRequest, res: FastifyReply) => {
        if (!req.user) {
            return res.status(400).send({ message: "Usuário não autenticado" })
        }

        const schemaUser = z.object({
            id: z.coerce.number().int(),
            role: z.coerce.number().int(),
        });

        try {
            const { role } = schemaUser.parse(req.user);

            if (!roleIds.includes(role)) {
                return res.status(403).send({ message: "Acesso proibido: Tipo de usuário não autorizado" });
            }
        } catch (error) {
            return res.status(400).send({ message: "Dados inválidos! Faça login novamente" })
        }
    };
};