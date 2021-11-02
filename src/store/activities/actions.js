import axios from "axios";

const API_URL = `http://localhost:4000/activities`;

export function startLoading() {
  return {
    type: "activities/startLoading",
  };
}

export function activitiesFetched(activities) {
  return {
    type: "activities/activitiesFetched",
    payload: activities,
  };
}

export const loadActivities = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());
    const res = await axios.get(`${API_URL}`);

    const loadedActivities = res.data;

    dispatch(activitiesFetched(loadedActivities));
  };
};
