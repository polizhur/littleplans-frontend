import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import Address from "../components/Address";
import Category from "../components/Category";
import "./ActivityDetailPage.css";

import { addUserActivity } from "../store/user/actions";
import { startLoading, detailsFetched } from "../store/activityDetails/actions";
import {
  selectActivityDetailsLoading,
  selectActivityDetails,
} from "../store/activityDetails/selectors";

const API_URL = `http://localhost:4000/activities`;

export default function ActivityDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const loading = useSelector(selectActivityDetailsLoading);
  const activity = useSelector(selectActivityDetails);

  const search = async () => {
    dispatch(startLoading());
    const res = await axios.get(`${API_URL}/${id}`);

    const loadedActivity = res.data;

    dispatch(detailsFetched(loadedActivity));
  };

  const onAdd = (id) => {
    dispatch(addUserActivity(id));
  };

  useEffect(() => {
    search();
  }, [id]);
  if (loading || !activity) return <em>Loading</em>;
  console.log(`the activity: ${activity}, loading: ${loading}`);

  return (
    <div className="container mt-5 mb-5">
      <h1>{activity.title}</h1>
      <p>
        <img
          className="activity-detail-image"
          alt={activity.title}
          src={activity.imageUrl}
        />
      </p>
      <p>
        <span class="material-icons orange600">category</span>{" "}
        <Category category={activity.category} />
      </p>
      <p>
        <span class="material-icons orange600">house</span>{" "}
        <Address address={activity.address} />
      </p>
      <p>
        <span class="material-icons orange600">event</span>{" "}
        {moment(activity.date).format("LLL")}
      </p>
      <p>
        <span class="material-icons orange600">timer</span> {activity.duration}{" "}
        min
      </p>
      <p>
        <span class="material-icons orange600">face</span>{" "}
        {activity.ageGroup.range}
      </p>
      <p>{activity.description}</p>
      <button
        className="btn btn-outline-secondary"
        onClick={() => onAdd(activity.id)}
      >
        Add to my calendar
      </button>
    </div>
  );
}
