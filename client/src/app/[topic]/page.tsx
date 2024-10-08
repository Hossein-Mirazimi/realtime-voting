import { redis } from "@/lib/redis";
import React from "react";
import ClientPage from "./ClientPage";

interface PageProps {
  params: {
    topic: string;
  };
}
async function page({ params }: PageProps) {
  const { topic } = params;

  const initialData = await redis.zrange<(string | number)[]>(
    `room:${topic}`,
    0,
    49,
    {
      withScores: true,
    }
  );

  const words: { text: string; value: number }[] = [];

  for (let i = 0; i < initialData.length; i++) {
    const [text, value] = initialData.slice(i, i + 2);

    if (typeof text === "string" && typeof value === "number") {
      words.push({ text, value });
    }
  }

  await redis.incr("served-requests");

  return <ClientPage topicName={topic} initialData={words} />;
}

export default page;
