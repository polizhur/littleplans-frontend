import { Link } from "react-router-dom";
import moment from "moment";
import Address from "./Address";
import Category from "./Category";
import "./Activity.css";

export default function Activity({ activity }) {
  return (
    <div>
      <h3>
        <Link to={"/activities/" + activity.id}>{activity.title}</Link>
      </h3>
      <p>
        <img
          className="activity-image"
          alt={activity.title}
          src={activity.imageUrl}
        />
      </p>
      <p>
        <span class="material-icons orange600">category</span>{" "}
        <Category category={activity.category} />
      </p>
      <p>
        <span class="material-icons orange600">event</span>{" "}
        {moment(activity.date).format("LLL")}
      </p>
      <p>
        <span class="material-icons orange600">house</span>{" "}
        <Address address={activity.address} />
      </p>
      <p>
        <span class="material-icons orange600">face</span>{" "}
        {activity.ageGroup.range}
      </p>
    </div>
  );
}
