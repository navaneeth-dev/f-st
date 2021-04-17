import { useState } from "react";
import Navbar from "../components/navbar";
import { getLocation } from "../lib/link";
import { getText } from "../lib/text";

export async function getServerSideProps(context) {
  const { query } = context;
  const { id } = query;

  if (id.length === 6) {
    const content = await getText(id);
    return {
      props: {
        id,
        text: true,
        content,
      },
    };
  }

  const location = await getLocation(id);
  if (!location) {
    return {
      props: {
        id,
      },
    };
  }

  return {
    redirect: {
      destination: location,
      permanent: false,
    },
  };
}

export default function Link({ id, text, content }) {
  if (text) {
    return (
      <div>
        <Navbar />
        <div className="container mt-3 text-center">
          <h5 className="font-weight-bold">F-ST Text</h5>
          <div className="row justify-content-center">
            <div className="col-5">
              <div className="card">
                <div className="card-body">
                  <p>{content.content}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>Error</h1>
      <p>{id} Not found</p>
    </div>
  );
}
