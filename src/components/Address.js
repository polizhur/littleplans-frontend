export default function Address({ address }) {
  return (
    <span>
      {address.street} {address.number} ({address.city}, {address.country})
    </span>
  );
}
