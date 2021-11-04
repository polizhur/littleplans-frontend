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

  return (
    <div className="My Calendar">
      {activities.map((activity) => (
        <div key={activity.activityId}>
          <Activity activity={activity} />
          <button onClick={() => onDelete(activity.id)}>
            Delete from my calendar
          </button>
        </div>
      ))}
    </div>
  );
}
