import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventFilter } from "../Lib/eventFilter";

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
  const [filteredActivitites, setFilteredActivitites] =
    useState(listOfActivities);

  useEffect(() => {
    if (!listOfActivities.length) dispatch(loadActivities());
    setFilteredActivitites(listOfActivities);
  }, [listOfActivities]);

  const onAdd = (id) => {
    dispatch(addUserActivity(id));
  };

  const triggerFilter = (conditions) => {
    const activitiesFiltered = eventFilter(listOfActivities, conditions);
    setFilteredActivitites(activitiesFiltered);
  };

  return (
    <div>
      <h1>List activities for your child with us!</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <SearchForm triggerFilter={triggerFilter} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {filteredActivitites.map((activity) => (
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
