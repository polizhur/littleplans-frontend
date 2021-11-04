import {
  LOG_OUT,
  LOGIN_SUCCESS,
  TOKEN_STILL_VALID,
  DELETE_ACTIVITY_SUCCESS,
  ADD_USERACTIVITY_SUCCESS,
} from "./actions";

const initialState = {
  token: localStorage.getItem("token"),
  name: null,
  email: null,
  activities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log(action.payload);
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case DELETE_ACTIVITY_SUCCESS:
      const activityId = parseInt(action.payload);
      const updatedActivities = state.activities.filter(
        (activity) => activity.id !== activityId
      );

      return {
        ...state,
        activities: updatedActivities,
      };

    case ADD_USERACTIVITY_SUCCESS:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };

    default:
      return state;
  }
};
