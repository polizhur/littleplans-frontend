import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadActivities } from "../store/activities/actions";

export default function SearchForm() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [age, setAge] = useState("");

  function submitForm(event) {
    event.preventDefault();

    dispatch(loadActivities(name, category, date, age));
  }
  return (
    <div>
      <form>
        <p>
          <label>
            Name:{" "}
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
        </p>
        <label>
          Category:{" "}
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>
        <label>
          Date:{" "}
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Age:{" "}
          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>
        <p>
          <button type="submit" onClick={submitForm}>
            Search
          </button>
        </p>
      </form>
    </div>
  );
}
