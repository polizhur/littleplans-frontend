import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./SearchForm.css";

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

  function clearFilters(event) {
    event.preventDefault();

    // clear form
    setName("");
    setCategoryId("");
    setDate("");
    setAgeGroupId("");

    // apply empty conditions
    const conditions = {};
    triggerFilter(conditions);
  }

  return (
    <form className="search-form">
      <div className="mb-3">
        <label className="form-label">Name:</label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Category:</label>
        <select
          className="form-select"
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
      </div>
      <div className="mb-3">
        <label className="form-label">Date:</label>
        <input
          className="form-control"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Age group:</label>
        <select
          className="form-select"
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
      </div>
      <button
        type="submit"
        onClick={submitForm}
        className="btn btn-primary btn-success"
      >
        Search
      </button>{" "}
      <button
        type="submit"
        onClick={clearFilters}
        className="btn btn-outline-secondary"
      >
        Show all activities
      </button>
    </form>
  );
}
