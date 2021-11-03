export default function Address({ address }) {
  return (
    <>
      <p>
        {address.street} {address.number}
      </p>
      <p>
        {address.city}, {address.country}
      </p>
    </>
  );
}
