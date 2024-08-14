import { fastify } from "fastify"
import multipart from '@fastify/multipart'
import fastifyBcrypt from "fastify-bcrypt"
import fastifyCookie from '@fastify/cookie';
import cors from "@fastify/cors"
import jwt from "@fastify/jwt"

import { errorHandler } from "./middleware";
import { routesPatients, routesQueries, routeUpload, userRoutes, authRoutes } from "@modules/exports"

const app = fastify({
    logger: true
})

// Middleware de tratamento de erros
app.setErrorHandler(errorHandler);

// Registre plugins
app.register(cors, {
    origin: "*"
});
app.register(multipart);
app.register(jwt, {
    secret: process.env.JWT_SECRET || 'defaultsecret'
});
app.register(fastifyBcrypt, {
    saltWorkFactor: 12
});
app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || 'some-secret',
    parseOptions: {}
});

// Registre rotas
app.register(authRoutes);
app.register(userRoutes);
app.register(routesPatients);
app.register(routesQueries);
app.register(routeUpload);

export { app }
