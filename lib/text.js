import faunadb from "faunadb";
import { client } from "./db";

const { Get, Match } = faunadb.query;

export const getText = async (short_id, password) => {
  try {
    const res = await client.query(
      Get(Match("get_content_by_short_id", short_id))
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
