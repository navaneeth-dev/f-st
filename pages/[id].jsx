import { getLocation } from "../lib/link";

export async function getServerSideProps(context) {
  const { res, query } = context;
  const { id } = query;

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

export default function Link({ id }) {
  return (
    <>
      <h1>Error</h1>
      <p>{id} Not found</p>
    </>
  );
}
