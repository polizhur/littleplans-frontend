import { Link } from "react-router-dom";

export default function Activity({ activity }) {
  return (
    <div
      style={{
        width: "25%",
        padding: "10px",
        boxSizing: "border-box",
      }}
    >
      <strong>{activity.title}</strong>
      <img
        alt={activity.title}
        width="600"
        height="350"
        margin="10px"
        src={activity.imageUrl}
      />
      <p>Date: {activity.date}</p>
      <p>{activity.address}</p>
      <p>Age: {activity.ageGroup}</p>
      <Link to={"/activities/" + activity.id}>View details</Link>
    </div>
  );
}
