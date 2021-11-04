import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function SearchForm(props) {
  const { triggerFilter } = props;

  const [name, setName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const [ageGroupId, setAgeGroupId] = useState("");

  const [categories, setCategories] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryResponse = await Axios.get(
        "http://localhost:4000/categories"
      );
      setCategories(categoryResponse.data);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getAgeGroups = async () => {
      const ageGroupResponse = await Axios.get(
        "http://localhost:4000/ageGroups"
      );
      setAgeGroups(ageGroupResponse.data);
    };
    getAgeGroups();
  }, []);

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
            Category:{" "}
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option value=""></option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
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
            Age group:{" "}
            <select
              value={ageGroupId}
              onChange={(e) => setAgeGroupId(e.target.value)}
            >
              <option value=""></option>
              {ageGroups.map((ageGroup) => (
                <option key={ageGroup.id} value={ageGroup.id}>
                  {ageGroup.range}
                </option>
              ))}
            </select>
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
