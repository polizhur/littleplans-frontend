import axios from "axios";
import { apiUrl } from "../../config/constants";
import { selectUser } from "../user/selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
} from "../appState/actions";
import { addProviderActivitySuccess } from "../user/actions";

export const ACTIVITY_POST_SUCCESS = "ACTIVITY_POST_SUCCESS";
export const ACTIVITY_DELETE_SUCCESS = "ACTIVITY_DELETE_SUCCESS";

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
    const res = await axios.get(`${apiUrl}/activities`);

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
      console.log("create success", response.data.activity);
      dispatch(activityPostSuccess(response.data.activity));
      dispatch(addProviderActivitySuccess(response.data.activity));
      dispatch(appDoneLoading());
    } catch (error) {
      console.log("something went wrong");
      console.log(error);
      dispatch(setError(error.response.data.message));
      dispatch(appDoneLoading());
    }

    // console.log("Yep!", response);
  };
};

export const activityDeleteSuccess = (activityId) => ({
  type: ACTIVITY_DELETE_SUCCESS,
  payload: activityId,
});
