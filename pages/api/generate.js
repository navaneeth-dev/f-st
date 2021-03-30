import redis from "redis";
import yup from "yup";
import { promisify } from "util";

const client = redis.createClient();
const setAsync = promisify(client.set).bind(client);

client.on("error", function (error) {
  throw error;
});

const generateRandomString = () => {
  const charList =
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 6; i++) {
    result += charList[Math.floor(Math.random() * charList.length)];
  }
  return result;
};

export default async (req, res) => {
  const url = generateRandomString();
  const redirect = req.body.url;
  await setAsync(url, redirect);

  res.status(200).json({ url: `${process.env.API_ROOT}/${url}`, redirect });
};
