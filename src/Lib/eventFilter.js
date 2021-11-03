export const eventFilter = (events, conditions) => {
  const { name, category, date, age } = conditions;
  console.log("the conditions inside filter", conditions);

  const filteredEventsByTitle = events.filter((event) => {
    console.log("event title", event.title.includes(name));
    return event.title.toLowerCase().includes(name.toLowerCase());
  });

  return filteredEventsByTitle;
};
