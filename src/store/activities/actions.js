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
