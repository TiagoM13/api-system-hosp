import { app } from "@app/app";

export const generateProvisionalPassword = () => Math.random().toString(36).slice(-8);

export const hashPassword = async (password: string) => {
    return await app.bcrypt.hash(password);
}
