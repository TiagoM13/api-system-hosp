import { FastifyReply, FastifyRequest } from "fastify";

import { AppError } from "@app/errors";
import { LoginService } from "./login-service";
import { schemaBody } from "../../schemas";

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

            return res.status(500).send({ error: "Internal Server Error" });
        }
    }
}
