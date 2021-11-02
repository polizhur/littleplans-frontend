export function selectActivityDetailsLoading(reduxState) {
  return reduxState.activityDetails.loading;
}

export function selectActivityDetails(reduxState) {
  return reduxState.activityDetails.activity;
}
