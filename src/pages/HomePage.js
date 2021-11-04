import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { eventNameFilter } from "../Lib/eventFilter";
import { eventCategoryFilter } from "../Lib/eventFilter";
import { eventDateFilter } from "../Lib/eventFilter";
import { eventAgeFilter } from "../Lib/eventFilter";

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
  const [filteredActivities, setFilteredActivities] =
    useState(listOfActivities);

  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [ageFilter, setAgeFilter] = useState("");
  const [categories, setCategories] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);

  useEffect(() => {
    if (!listOfActivities.length) dispatch(loadActivities());
    setFilteredActivities(listOfActivities);
  }, [listOfActivities, dispatch]);

  const onAdd = (id) => {
    dispatch(addUserActivity(id));
  };

  const triggerNameFilter = (name) => {
    const activitiesFiltered = eventNameFilter(listOfActivities, name);
    setFilteredActivities(activitiesFiltered);
  };

  const triggerCategoryFilter = (category) => {
    const activitiesFiltered = eventCategoryFilter(listOfActivities, category);
    setFilteredActivities(activitiesFiltered);
  };

  const triggerDateFilter = (date) => {
    const activitiesFiltered = eventDateFilter(listOfActivities, date);
    setFilteredActivities(activitiesFiltered);
  };

  const triggerAgeFilter = (age) => {
    const activitiesFiltered = eventAgeFilter(listOfActivities, age);
    setFilteredActivities(activitiesFiltered);
  };

  return (
    <div>
      <h1>List activities for your child with us!</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <SearchForm
            triggerFilter={triggerNameFilter}
            value={nameFilter}
            setValue={setNameFilter}
            label={"Name"}
          />
          <SearchForm
            triggerFilter={triggerCategoryFilter}
            value={categoryFilter}
            setValue={setCategoryFilter}
            label={"Category"}
          />
          <SearchForm
            triggerFilter={triggerDateFilter}
            value={dateFilter}
            setValue={setDateFilter}
            label={"Date"}
          />
          <SearchForm
            triggerFilter={triggerAgeFilter}
            value={ageFilter}
            setValue={setAgeFilter}
            label={"Age group"}
          />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            {filteredActivities.map((activity) => (
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
