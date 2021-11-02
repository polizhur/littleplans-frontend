const initialState = {
  loading: false,
  activity: null,
};

export default function activityDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case "activityDetails/startLoading": {
      return {
        ...state,
        loading: true,
      };
    }
    case "activityDetails/detailsFetched": {
      return {
        loading: false,
        activity: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
