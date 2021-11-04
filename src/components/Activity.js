import { Link } from "react-router-dom";
import moment from "moment";
import Address from "./Address";

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
      <p>Date: {moment(activity.date).format("LLL")}</p>
      <div>
        <p>Location:</p> <Address address={activity.address} />
      </div>
      <p>Age: {activity.ageGroup.range}</p>
      <Link to={"/activities/" + activity.id}>View details</Link>
    </div>
  );
}
