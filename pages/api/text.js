import { aesEncrypt, generateRandomString, aesDecrypt } from "../../lib/crypto";
import { client } from "../../lib/db";
import faunadb from "faunadb";
import * as yup from "yup";

let schema = yup.string().required().min(3);

const { Create, Collection } = faunadb.query;

export const createText = async (content) => {
  try {
    const short_id = await generateRandomString(6);
    await client.query(
      Create(Collection("texts"), { data: { short_id, content } })
    );
    return short_id;
  } catch (error) {
    console.error(error.description ?? error);
    return "";
  }
};

export default async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");

  try {
    if (req.method === "POST") {
      const { content } = req.body;

      await schema.validate(content);

      const textID = await createText(content);
      if (!textID) {
        res
          .status(500)
          .json({ status: "error", message: "Failed to create text" });
        return;
      }

      res.json({ long_url: `${process.env.API_ROOT}/${textID}` });
    } else if (req.method === "OPTIONS") {
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  } catch (err) {
    res.status(400).json({ status: "error", message: err.errors[0] });
  }
};
