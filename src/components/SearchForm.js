import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadActivities } from "../store/activities/actions";

export default function SearchForm(props) {
  // const dispatch = useDispatch();
  const { triggerFilter, value, setValue, label } = props;

  function submitForm(event) {
    event.preventDefault();
    triggerFilter(value);
    // dispatch(loadActivities(name, category, date, age));
  }
  return (
    <div>
      <form>
        <div>
          <label>
            {label}:
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
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
