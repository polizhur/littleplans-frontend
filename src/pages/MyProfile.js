import ActivityForm from "../components/ActivityForm";
import { useDispatch, useSelector } from "react-redux";
import { selectProviderActivities } from "../store/user/selectors";
import { deleteProviderActivity } from "../store/user/actions";
import Activity from "../components/Activity";
import { useState } from "react";

export default function MyProfile() {
  const activities = useSelector(selectProviderActivities);
  const dispatch = useDispatch();
  const [formOpen, setFormOpen] = useState(false);

  const sortedActivities = [...activities].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const onDelete = (id) => {
    console.log("deleting activity!", id);
    dispatch(deleteProviderActivity(id));
  };

  return (
    <div class="container">
      <div class="mt-5 mb-5 col-md-6 offset-md-3">
        <button
          onClick={() => setFormOpen(!formOpen)}
          className="btn btn-primary"
        >
          Add an Activity
        </button>
        {formOpen && <ActivityForm />}
      </div>
      <div className="activities-container">
        {sortedActivities.map((activity) => (
          <div key={activity.id} className="activity-item">
            <Activity activity={activity} />
            <button
              className="btn btn-outline-danger"
              onClick={() => onDelete(activity.id)}
            >
              Delete my activity
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
