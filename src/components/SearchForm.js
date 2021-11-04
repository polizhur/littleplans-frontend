import React, { useState, useEffect } from "react";

export default function SearchForm(props) {
  const { triggerFilter } = props;

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const [ageGroupId, setAgeGroupId] = useState("");

  function submitForm(event) {
    event.preventDefault();
    const conditions = { name, categoryId, date, ageGroupId };
    triggerFilter(conditions);
  }

  return (
    <div>
      <form>
        <div>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Category:
            <input
              type="text"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Date:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </label>
        </div>

        <div>
          <label>
            Age group:
            <input
              type="text"
              value={ageGroupId}
              onChange={(e) => setAgeGroupId(e.target.value)}
            />
          </label>
        </div>

        <div>
          <button type="submit" onClick={submitForm}>
            Search
          </button>
        </div>
      </form>
    </div>
  );
}
