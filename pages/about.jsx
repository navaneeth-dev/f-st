import Head from "next/head";
import Navbar from "../components/navbar";

const About = () => {
  return (
    <div>
      <Head>
        <title>F-ST | About</title>
      </Head>

      <Navbar />
      <main className="container mt-3">
        <h2>About</h2>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Debitis
          aspernatur explicabo doloribus eos deserunt. Error officia dolor quo
          laudantium nihil quibusdam repellat voluptatem rem, repudiandae
          consequatur fuga exercitationem aliquid cumque? Dolorum maiores
          delectus ipsam mollitia hic quae fugiat vel ut autem. Exercitationem
          accusantium reprehenderit repellat aperiam architecto labore
          repudiandae quos officiis nobis ducimus doloribus velit eum laboriosam
          vero aliquid, culpa sequi nisi sit delectus suscipit! Commodi id
          repellendus voluptatibus quas modi iste atque veritatis suscipit
          dignissimos velit ducimus vitae ad reiciendis nam nemo animi dolorem,
          sint fugiat odit ab eos temporibus distinctio iure nobis.
          Perspiciatis, incidunt. Inventore debitis optio modi.
        </p>
      </main>
    </div>
  );
};

export default About;
