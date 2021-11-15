import { apiUrl } from "../../config/constants";
import axios from "axios";
import { selectToken, selectUser } from "./selectors";
import {
  appLoading,
  appDoneLoading,
  showMessageWithTimeout,
  setMessage,
} from "../appState/actions";
import { activityDeleteSuccess } from "../activities/actions";

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const TOKEN_STILL_VALID = "TOKEN_STILL_VALID";
export const LOG_OUT = "LOG_OUT";
export const DELETE_ACTIVITY_SUCCESS = "DELETE_ACTIVITY_SUCCESS";
export const DELETE_PROVIDER_ACTIVITY_SUCCESS =
  "DELETE_PROVIDER_ACTIVITY_SUCCESS";
export const ADD_USERACTIVITY_SUCCESS = "ADD_USERACTIVITY_SUCCESS";
export const ADD_PROVIDERACTIVITY_SUCCESS = "ADD_PROVIDERACTIVITY_SUCCESS";

const loginSuccess = (userWithToken) => {
  return {
    type: LOGIN_SUCCESS,
    payload: userWithToken,
  };
};

const deleteActivitySuccess = (activityId) => {
  return {
    type: DELETE_ACTIVITY_SUCCESS,
    payload: activityId,
  };
};

const deleteProviderActivitySuccess = (activityId) => {
  return {
    type: DELETE_PROVIDER_ACTIVITY_SUCCESS,
    payload: activityId,
  };
};

const addUserActivitySuccess = (activity) => {
  return {
    type: ADD_USERACTIVITY_SUCCESS,
    payload: activity,
  };
};

export const addProviderActivitySuccess = (activity) => {
  return {
    type: ADD_PROVIDERACTIVITY_SUCCESS,
    payload: activity,
  };
};

const tokenStillValid = (userWithoutToken) => ({
  type: TOKEN_STILL_VALID,
  payload: userWithoutToken,
});

export const logOut = () => ({ type: LOG_OUT });

// thunks

export const signUp = (name, email, password, isProvider) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        name,
        email,
        password,
        isProvider,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", true, "account created"));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const login = (email, password) => {
  return async (dispatch, getState) => {
    dispatch(appLoading());
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        email,
        password,
      });

      dispatch(loginSuccess(response.data));
      dispatch(showMessageWithTimeout("success", false, "welcome back!", 1500));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const getUserWithStoredToken = () => {
  return async (dispatch, getState) => {
    // get token from the state
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      // if we do have a token,
      // check wether it is still valid or if it is expired
      const response = await axios.get(`${apiUrl}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("user", response.data);
      // token is still valid
      dispatch(tokenStillValid(response.data));
      dispatch(appDoneLoading());
    } catch (error) {
      if (error.response) {
        console.log(error.response.message);
      } else {
        console.log(error);
      }
      // if we get a 4xx or 5xx response,
      // get rid of the token by logging out
      dispatch(logOut());
      dispatch(appDoneLoading());
    }
  };
};

export const deleteUserActivity = (activityId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.delete(
        `${apiUrl}/userActivities/${activityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(deleteActivitySuccess(activityId));
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 1500)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const deleteProviderActivity = (activityId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.delete(
        `${apiUrl}/activities/${activityId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      dispatch(deleteProviderActivitySuccess(activityId));
      dispatch(activityDeleteSuccess(activityId));
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 1500)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};

export const addUserActivity = (activityId) => {
  return async (dispatch, getState) => {
    const token = selectToken(getState());

    // if we have no token, stop
    if (token === null) return;

    dispatch(appLoading());
    try {
      const response = await axios.post(
        `${apiUrl}/userActivities/`,
        {
          activityId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data);
      dispatch(addUserActivitySuccess(response.data.activity));
      dispatch(appDoneLoading());
      dispatch(
        showMessageWithTimeout("success", false, response.data.message, 1500)
      );
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message);
        dispatch(setMessage("danger", true, error.response.data.message));
      } else {
        console.log(error.message);
        dispatch(setMessage("danger", true, error.message));
      }
      dispatch(appDoneLoading());
    }
  };
};
