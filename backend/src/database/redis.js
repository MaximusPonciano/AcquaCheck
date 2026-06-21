import { createClient } from "redis";
import "dotenv/config";

const redisClient = createClient({
  url: `redis://${process.env.REDIS_HOST || "redis_cache"}:6379`
});

redisClient.on("error", (err) => console.error("Redis error:", err));
redisClient.on("connect", () => console.log("Conectado ao Redis com sucesso!"));

// Conecta o cliente do Redis (assíncrono)
await redisClient.connect();

export default redisClient;
