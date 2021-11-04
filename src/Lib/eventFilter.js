// export const eventFilter = (events, conditions) => {
//   const { name, category, date, age } = conditions;
//   console.log("the conditions inside filter", conditions);

//   // Filter on title
//   const filteredEventsByTitle = events.filter((event) => {
//     console.log("event title", event.title.includes(name));
//     return event.title.toLowerCase().includes(name.toLowerCase());
//   });

//   // Filter on categories
//   const filteredEventsByCategory = filteredEventsByTitle.filter((event) => {
//     return event.category.toLowerCase() === event.toLowerCase();
//   });

//   return filteredEventsByTitle;
// };

export const eventNameFilter = (events, name) => {
  // Filter on title
  const filteredEventsByTitle = events.filter((event) => {
    console.log("event title", event.title.includes(name));
    return event.title.toLowerCase().includes(name.toLowerCase());
  });
  return filteredEventsByTitle;
};

export const eventCategoryFilter = (events, category) => {
  // Filter on categories
  const filteredEventsByCategories = events.filter((event) => {
    console.log("event category", event.category.includes(category));
    return event.category.toLowerCase().includes(category.toLowerCase());
  });
  return filteredEventsByCategories;
};

export const eventDateFilter = (events, date) => {
  // Filter on dates
  const filteredEventsByDates = events.filter((event) => {
    console.log("event date", event.date.includes(date));
    return event.date.toLowerCase().includes(date.toLowerCase());
  });
  return filteredEventsByDates;
};

export const eventAgeFilter = (events, age) => {
  // Filter on age
  const filteredEventsByAge = events.filter((event) => {
    console.log("event age", event.age.includes(age));
    return event.age.toLowerCase().includes(age.toLowerCase());
  });
  return filteredEventsByAge;
};
