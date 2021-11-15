import { ACTIVITY_POST_SUCCESS, ACTIVITY_DELETE_SUCCESS } from "./actions";

const initialState = {
  loading: false,
  activities: [],
  error: "",
};

export default function activitiesSliceReducer(state = initialState, action) {
  switch (action.type) {
    case "activities/startLoading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "activities/activitiesFetched": {
      return {
        loading: false,
        activities: [...action.payload],
      };
    }
    case "activities/setError": {
      return {
        loading: false,
        error: action.payload,
      };
    }
    case ACTIVITY_POST_SUCCESS: {
      const newActivities = [...state.activities, action.payload];
      newActivities.sort(function (a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      console.log("new activities", newActivities);
      return {
        ...state,
        activities: newActivities,
      };
    }
    case ACTIVITY_DELETE_SUCCESS: {
      const activityId = parseInt(action.payload);
      const updatedActivities = state.activities.filter(
        (activity) => activity.id !== activityId
      );
      return {
        ...state,
        activities: updatedActivities,
      };
    }
    default: {
      return state;
    }
  }
}
