export const selectToken = (state) => state.user.token;

export const selectUser = (state) => state.user;

export const selectUserActivities = (state) => state.user.activities;

export const selectProviderActivities = (state) =>
  state.user.providerActivities;
