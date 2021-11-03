import { ACTIVITY_POST_SUCCESS } from "./actions";

const initialState = {
  loading: false,
  activities: [],
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
    case ACTIVITY_POST_SUCCESS:
      return {
        ...state,
        activities: [...state.activities, action.payload],
      };
    default: {
      return state;
    }
  }
}
