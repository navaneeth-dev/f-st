import * as yup from "yup";
import { generateRandomString } from "../../lib/crypto";
import { client } from "../../lib/db";
import faunadb from "faunadb";

const { Create, Collection } = faunadb.query;

let schema = yup.string().url().required();

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  if (req.method === "POST") {
    const { long_url } = req.body;
    const isURLValid = await schema.isValid(long_url);

    if (!isURLValid) {
      res
        .status(400)
        .json({ status: "error", message: "Please enter a valid URL" });
      return;
    }

    const short_id = generateRandomString(process.env.URL_GENERATION_LENGTH);
    try {
      await client.query(
        Create(Collection("urls"), { data: { short_id, long_url } })
      );

      console.log(short_id);

      res.json({
        short_url: `${process.env.API_ROOT}/${short_id}`,
        long_url,
        status: "ok",
      });
    } catch (e) {
      console.error(e);
      res.status(500).json({ status: "error" });
    }
  } else if (req.method === "OPTIONS") {
    res.status(200).end();
  } else {
    res.status(405).end();
  }
};
