import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Activity from "../components/Activity";
import SearchForm from "../components/SearchForm";
import { addUserActivity } from "../store/user/actions";

import { loadActivities } from "../store/activities/actions";
import {
  selectActivitiesLoading,
  selectActivities,
} from "../store/activities/selectors";

export default function HomePage() {
  const dispatch = useDispatch();

  const loading = useSelector(selectActivitiesLoading);
  const listOfActivities = useSelector(selectActivities);

  useEffect(() => {
    dispatch(loadActivities());
  }, []);

  const onAdd = (id) => {
    console.log("adding activity!", id);
    dispatch(addUserActivity(id));
  };

  return (
    <div>
      <h1>List activities for your child with us!</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <SearchForm />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {listOfActivities.map((activity) => (
              <div key={activity.id}>
                <Activity activity={activity} />
                <button onClick={() => onAdd(activity.id)}>
                  Add to my calendar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
