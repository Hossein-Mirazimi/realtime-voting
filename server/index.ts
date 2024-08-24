import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { Redis } from "ioredis";
import "dotenv/config";

const app = express();

app.use(cors());

const redis = new Redis(process.env.REDIS_CONNECTION_STRING);
const subRedis = new Redis(process.env.REDIS_CONNECTION_STRING);

const server = http.createServer(app);
const SOCKET_PORT = process.env.SOCKET_PORT || 3000;

const io = new Server(server, {
  cors: {
    origin: [`http://localhost:${SOCKET_PORT}`],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

subRedis.on("message", (channel, message) => {
  io.to(channel).emit("room-update", message);
});

subRedis.on("error", (err) => {
  console.log("Redis subscription error", err);
});

io.on("connection", async (socket) => {
  const { id } = socket;

  socket.on("join-room", async (room: string) => {
    console.log("user joined room: ", room);

    const subscribedRooms = await redis.smembers("subscribed-rooms");
    await socket.join(room);
    await redis.sadd(`room:${id}`, room);
    await redis.hincrby("room-connections", room, 1);

    if (!subscribedRooms.includes(room)) {
      subRedis.subscribe(room, async (err) => {
        if (err) {
          console.log("Failed to subscribe:", err);
        } else {
          await redis.sadd("subscribed-rooms", room);
          console.log("subscribed-to room:", room);
        }
      });
    }
  });

  socket.on("disconnect", async () => {
    const { id } = socket;

    const joinedRooms = await redis.smembers(`room:${id}`);
    await redis.del(`room:${id}`);
    joinedRooms.forEach(async (room) => {
      const remainingConnections = await redis.hincrby(
        `room-connections`,
        room,
        -1
      );
      if (remainingConnections <= 0) {
        await redis.hdel(`room-connections`, room);

        subRedis.unsubscribe(room, async (err) => {
          if (err) {
            console.log("Failed to unsubscribe");
          } else {
            await redis.srem("subscribed-rooms", room);
            console.log("unsubscribed from room: ", room);
          }
        });
      }
    });
  });
});

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
