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
  userActivities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return { ...state, ...action.payload };

    case LOG_OUT:
      localStorage.removeItem("token");
      return { ...initialState, token: null };

    case TOKEN_STILL_VALID:
      return { ...state, ...action.payload };

    case DELETE_ACTIVITY_SUCCESS:
      const userActivityId = parseInt(action.payload);
      const updatedUserActivities = state.userActivities.filter(
        (userActivity) => userActivity.id !== userActivityId
      );

      return {
        ...state,
        userActivities: updatedUserActivities,
      };

    case ADD_USERACTIVITY_SUCCESS:
      return {
        ...state,
        userActivities: [...state.userActivities, action.payload],
      };

    default:
      return state;
  }
};
