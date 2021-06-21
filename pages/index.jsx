import Head from "next/head";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Header from "../components/header";
import Navbar from "../components/navbar";
import Button from "../components/ui/button";

const Home = () => {
  const [long_url, setLongUrl] = useState("");
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const ref = useRef(null);

  const handleGenerate = async () => {
    setLoading(true);
    const result = await fetch("/api/generate", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        long_url,
      }),
    });
    const json = await result.json();
    if (json.status === "ok") {
      const { short_url, long_url } = json;
      setLinks([
        {
          short_url,
          long_url,
        },
        ...links,
      ]);
    }
    setLoading(false);
  };

  const handleChange = (event) => {
    setLongUrl(event.target.value);
  };

  useEffect(() => {
    if (ref.current) {
      ref.current.focus();
    }
  }, []);

  return (
    <div>
      <Head>
        <title>F-ST</title>
      </Head>

      <Navbar />
      <main className="container mt-3">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <Header />
            <form className="input-group mb-3" onSubmit={(e) => e.preventDefault()}>
              <input
                type="url"
                className="form-control"
                placeholder="Enter URL"
                aria-label="Enter URL"
                aria-describedby="button-addon2"
                value={long_url}
                onChange={handleChange}
                autoCapitalize="none"
                autoCorrect="off"
                required="on"
                ref={ref}
              />
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
            </form>
          </div>
        </div>
      </main>

      <section className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2>Links</h2>
            <div className="row">
              {links.map((link) => (
                <div className="col-sm-12" key={link.short_url}>
                  <div
                    className="alert alert-dark d-flex flex-column flex-lg-row justify-content-between align-items-center"
                    role="alert"
                  >
                    <span className="m-1 m-lg-0">
                      {`${link.long_url.substr(0, 47)}${link.long_url.length > 47 ? "..." : ""
                        }`}
                    </span>
                    <div className="d-flex flex-column flex-lg-row align-items-center">
                      <Link href={link.short_url}>
                        <a className="alert-link mr-0 mr-lg-2">{link.short_url}</a>
                      </Link>
                      <Button link={link.short_url} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
