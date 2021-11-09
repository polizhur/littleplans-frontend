import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserActivities } from "../store/user/selectors";
import Activity from "../components/Activity";
import { deleteUserActivity } from "../store/user/actions";
import { useEffect } from "react";

export default function MyCalendar() {
  const activities = useSelector(selectUserActivities);
  const dispatch = useDispatch();
  console.log("activity", activities);

  useEffect(() => {
    console.log(activities);
  }, [activities]);
  const onDelete = (id) => {
    console.log("deleting activity!", id);
    dispatch(deleteUserActivity(id));
  };

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="container">
      <div className="activities-container">
        {sortedActivities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <Activity activity={activity} />
            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(activity.id)}
            >
              Delete from my calendar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
