export default function Address({ address }) {
  return (
    <div>
      <p>
        {address.street} {address.number}
      </p>
      <p>
        {address.city}, {address.country}
      </p>
    </div>
  );
}
