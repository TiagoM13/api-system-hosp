import { app } from "@app/app";

const PORT = process.env.PORT || 6006;
const HOST = process.env.HOST || 'localhost';

const startServer = async () => {
  try {
    await app.listen({ port: Number(PORT), host: HOST });

    console.log(`🚀 Server is running at http://${HOST}:${PORT}`)
  } catch (err) {
    console.error(`❌ Failed to start server on http://${HOST}:${PORT}`, err);
    process.exit(1);
  }
}

if (process.env.NODE_ENV !== 'production') {
  startServer()
} else {
  console.log('🚫 Server not started in production environment.')
}
