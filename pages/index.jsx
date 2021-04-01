import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/Home.module.scss";
import Link from "next/link";

export default function Home() {
  const [url, setURL] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await fetch("/api/generate/", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        url,
      }),
    });
    const json = await result.json();
    if (json.status === "ok") {
      setLinks([
        {
          url: json.url,
          redirect: json.redirect,
        },
        ...links,
      ]);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setURL(event.target.value);
  };

  const handleCopy = (link) => {
    navigator.clipboard.writeText(link);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>F-ST</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mt-3">
        <div className="d-flex flex-column align-items-center">
          <h2 className="d-flex">
            <a href="https://github.com/RizeXor/f-st">F-ST</a>
            <span className="badge badge-secondary ml-2">
              {process.env.NEXT_PUBLIC_APP_VERSION}
            </span>
          </h2>
          <p className="lead">Worlds most trusted open source URL shortner</p>
        </div>
        <form
          className="input-group input-group mb-3"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="url"
            className="form-control"
            placeholder="Enter URL"
            aria-label="Enter URL"
            aria-describedby="button-addon2"
            value={url}
            onChange={handleChange}
            autoCapitalize="none"
            autoCorrect="off"
            autoFocus="on"
            required="on"
          />
          <div className="input-group-append">
            <button
              className="btn btn-primary"
              type="submit"
              id="button-addon2"
              onClick={handleGenerate}
              disabled={loading}
            >
              {loading ? "Generating... " : "Generate "}
              {!loading && <i className="bi bi-box-arrow-right"></i>}
            </button>
          </div>
        </form>
      </main>

      <section className="container">
        <h2>Links</h2>
        <div className="row">
          {links.map((link) => (
            <div className="col-sm-12" key={link.url}>
              <div
                className="alert alert-dark d-flex flex-column flex-lg-row justify-content-between align-items-center"
                role="alert"
              >
                <span className="m-1 m-lg-0">
                  {`${link.redirect.substr(0, 47)}${
                    link.redirect.length > 47 ? "..." : ""
                  }`}
                </span>
                <div className="d-flex flex-column flex-lg-row align-items-center">
                  <Link href={link.url}>
                    <a className="alert-link mr-0 mr-lg-2">{link.url}</a>
                  </Link>
                  <button
                    className="btn btn-secondary mt-1 mt-lg-0"
                    onClick={() => handleCopy(link.url)}
                  >
                    <i className="bi bi-clipboard"></i>
                    {" Copy"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
