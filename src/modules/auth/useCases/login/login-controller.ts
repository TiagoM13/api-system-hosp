import { FastifyReply, FastifyRequest } from "fastify";
import { ZodError } from "zod";

import { AppError } from "@app/errors";
import { schemaBody } from "@modules/auth/schemas";
import { LoginService } from "./login-service";

export class LoginController {
    private loginService: LoginService;

    constructor(loginService: LoginService) {
        this.loginService = loginService;
    }

    async handle(req: FastifyRequest, res: FastifyReply) {
        try {
            const { email, password } = schemaBody.parse(req.body);

            const { token, user } = await this.loginService.execute({ email, password });

            res.setCookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600
            });

            return res.status(201).send({ success: true, token, user });
        } catch (error) {
            if (error instanceof AppError) {
                return res.status(400).send({ message: error.message });
            }

            if (error instanceof ZodError) {
                return res.status(400).send({
                    message: 'Invalid request body',
                    errors: error.flatten().fieldErrors
                })
            }

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}
