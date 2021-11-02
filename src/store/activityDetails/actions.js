export function startLoading() {
  return {
    type: "activityDetails/startLoading",
  };
}

export function detailsFetched(activityDetails) {
  return {
    type: "activityDetails/detailsFetched",
    payload: activityDetails,
  };
}
