import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Address from "../components/Address";
import Category from "../components/Category";

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

  useEffect(() => {
    search();
  }, [id]);
  if (loading || !activity) return <em>Loading</em>;
  console.log(`the activity: ${activity}, loading: ${loading}`);

  return (
    <div className="ActivityDetailPage">
      <div>
        <h1>{activity.title}</h1>
        <img alt={activity.title} src={activity.imageUrl} />
        <div className="details">
          <h3>Category:</h3>
          <Category category={activity.category} />
          <h3>Location:</h3>
          <Address address={activity.address} />
          <h3>Date:</h3>
          <p>{activity.date}</p>
          <h3>Duration:</h3>
          <p>{activity.duration}</p>
          <h3>Age:</h3>
          <p>{activity.ageGroup}</p>
          <h3>About:</h3>
          <p>{activity.description}</p>
          <button>Add to my calendar</button>
        </div>
      </div>
    </div>
  );
}
