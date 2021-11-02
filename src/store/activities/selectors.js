export function selectActivitiesLoading(reduxState) {
  return reduxState.activities.loading;
}

export function selectActivities(reduxState) {
  return reduxState.activities.activities;
}
