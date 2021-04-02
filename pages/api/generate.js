import redis from "redis";
import * as yup from "yup";
import { promisify } from "util";

const client = redis.createClient(6379, process.env.REDIS_HOST);
const setAsync = promisify(client.set).bind(client);

let schema = yup.string().url().required();

client.on("error", function (error) {
  throw error;
});

const generateRandomString = () => {
  const charList =
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < process.env.URL_GENERATION_LENGTH; i++) {
    result += charList[Math.floor(Math.random() * charList.length)];
  }
  return result;
};

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "POST") {
    const redirect = req.body.url;
    const isURLValid = await schema.isValid(redirect);

    if (!isURLValid) {
      res
        .status(400)
        .json({ status: "error", message: "Please enter a valid URL" });
      return;
    }

    const url = generateRandomString();
    await setAsync(url, redirect);

    res.json({ url: `${process.env.API_ROOT}/${url}`, redirect, status: "ok" });
  } else if (req.method === "OPTIONS") {
    console.log("options");
    res.status(200).end();
  } else {
    res.status(405).end();
  }
};
