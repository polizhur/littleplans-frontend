import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";

export const ACTIVITY_POST_SUCCESS = "ACTIVITY_POST_SUCCESS";

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

export function setError(error) {
  return {
    type: "activities/setError",
    payload: error,
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

export const activityPostSuccess = (activity) => ({
  type: ACTIVITY_POST_SUCCESS,
  payload: activity,
});

export const postActivity = (
  title,
  imageUrl,
  categoryId,
  street,
  number,
  postcode,
  city,
  country,
  longitude,
  latitude,
  date,
  duration,
  capacity,
  description,
  ageGroupId,
  isParentRequired
) => {
  return async (dispatch, getState) => {
    const { token } = selectUser(getState());
    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/activities`,
        {
          title,
          imageUrl,
          categoryId,
          street,
          number,
          postcode,
          city,
          country,
          longitude,
          latitude,
          date,
          duration,
          capacity,
          description,
          ageGroupId,
          isParentRequired,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 3000)
      );
      dispatch(activityPostSuccess(response.data.activity));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log("something went wrong");
      console.log(error.response.data.message);
      dispatch(setError(error.response.data.message));
      dispatch(appDoneLoading());
    }

    // console.log("Yep!", response);
  };
};
