import redis from "redis";
import { promisify } from "util";

const client = redis.createClient(6379, process.env.REDIS_HOST);
const getAsync = promisify(client.get).bind(client);

client.on("error", function (error) {
  console.error(error);
});

export const getLocation = async (id) => {
  const data = await getAsync(id);
  return data;
};
