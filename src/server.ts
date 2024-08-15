import { app } from "./app"

const PORT = 6006;
const HOST = 'localhost';

app.listen({ port: PORT, host: HOST }, () => {
    console.log(`🚀 System Hosp Server Running...`);
});