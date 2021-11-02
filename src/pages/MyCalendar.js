import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectUserActivities } from "../store/user/selectors";
import Activity from "../components/Activity";
import { deleteUserActivity } from "../store/user/actions";

export default function MyCalendar() {
  const userActivities = useSelector(selectUserActivities);
  const dispatch = useDispatch();
  console.log("activity", userActivities);

  const onDelete = (id) => {
    console.log("deleting activity!", id);
    dispatch(deleteUserActivity(id));
  };

  return (
    <div className="My Calendar">
      {userActivities.map((userActivity) => (
        <div key={userActivity.activityId}>
          <Activity activity={userActivity.activity} />
          <button onClick={() => onDelete(userActivity.id)}>
            Delete from my calendar
          </button>
        </div>
      ))}
    </div>
  );
}
