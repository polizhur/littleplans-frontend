export const filterActivites = (allActivities, conditions) => {
  const { name, categoryId, date, ageGroupId } = conditions;
  console.log("the conditions inside filter", conditions);

  let filteredActivities = allActivities;

  // Filter on title
  if (name) {
    filteredActivities = filteredActivities.filter((event) => {
      return event.title.toLowerCase().includes(name.toLowerCase());
    });
  }

  // Filter on categories
  if (categoryId) {
    filteredActivities = filteredActivities.filter((event) => {
      return event.categoryId === parseInt(categoryId);
    });
  }

  // Filter on date
  if (date) {
    filteredActivities = filteredActivities.filter((event) => {
      return event.date.includes(date);
    });
  }

  // Filter on age
  if (ageGroupId) {
    filteredActivities = filteredActivities.filter((event) => {
      return event.ageGroupId === parseInt(ageGroupId);
    });
  }

  return filteredActivities;
};
