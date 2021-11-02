import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Activity from "../components/Activity";

import { startLoading, activitiesFetched } from "../store/activities/actions";
import {
  selectActivitiesLoading,
  selectActivities,
} from "../store/activities/selectors";

const API_URL = `http://localhost:4000/activities`;

export default function HomePage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectActivitiesLoading);
  const listOfActivities = useSelector(selectActivities);

  const search = async () => {
    dispatch(startLoading());
    const res = await axios.get(`${API_URL}`);

    const loadedActivities = res.data;

    dispatch(activitiesFetched(loadedActivities));
  };

  useEffect(() => {
    search();
  }, []);

  return (
    <div>
      <h1>Activities</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {listOfActivities.map((activity) => (
              <Activity key={activity.id} activity={activity} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
