import { client } from "./db";
import faunadb from "faunadb";

const { Get, Match } = faunadb.query;

export const getLocation = async (short_id) => {
  try {
    const res = await client.query(Get(Match("find_by_short_id", short_id)));
    const { long_url } = res.data;
    return long_url;
  } catch (error) {
    console.log(error.description);
    return "";
  }
};
