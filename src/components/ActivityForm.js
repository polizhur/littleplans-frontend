import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { postActivity } from "../store/activities/actions";
import Axios from "axios";

export default function ActivityForm() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [street, setStreet] = useState("");
  const [number, setNumber] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");
  const [description, setDescription] = useState("");
  const [ageGroupId, setAgeGroupId] = useState("");
  const [isParentRequired, setisParentRequired] = useState(false);

  const [categories, setCategories] = useState([]);
  const [ageGroups, setAgeGroups] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      const categoryResponse = await Axios.get(
        "http://localhost:4000/categories"
      );
      setCategories(categoryResponse.data);
      console.log(categoryResponse.data[0].id);
      setCategoryId(categoryResponse.data[0].id);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const getAgeGroups = async () => {
      const ageGroupResponse = await Axios.get(
        "http://localhost:4000/ageGroups"
      );
      setAgeGroups(ageGroupResponse.data);
      setAgeGroupId(ageGroupResponse.data[0].id);
    };
    getAgeGroups();
  }, []);

  function submitForm(event) {
    event.preventDefault();

    dispatch(
      postActivity(
        title,
        imageUrl,
        categoryId,
        street,
        number,
        postcode,
        city,
        country,
        longitude,
        latitude,
        date,
        duration,
        capacity,
        description,
        ageGroupId,
        isParentRequired
      )
    );
    setTitle("");
    setImageUrl("");
    setCategoryId("");
    setStreet("");
    setNumber("");
    setPostcode("");
    setCity("");
    setCountry("");
    setLongitude("");
    setLatitude("");
    setDate("");
    setDuration("");
    setCapacity("");
    setDescription("");
    setAgeGroupId("");
    setisParentRequired(false);
  }

  const handleChange = () => {
    setisParentRequired(!isParentRequired);
    console.log("handleChange");
  };

  return (
    <form>
      <h1>Post your event</h1>
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          className="form-control form-control-lg"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Image url:</label>
        <input
          className="form-control"
          type="text"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
        />

        <img src={`${imageUrl}`} alt="" />
      </div>

      <div className="mb-3 row">
        <div className="col">
          <label className="form-label">Category:</label>
          <select
            className="form-select"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Age group:</label>
          <select
            className="form-select"
            value={ageGroupId}
            onChange={(e) => setAgeGroupId(e.target.value)}
          >
            {ageGroups.map((ageGroup) => (
              <option key={ageGroup.id} value={ageGroup.id}>
                {ageGroup.range}
              </option>
            ))}
          </select>
        </div>
        <div className="col">
          <label className="form-label">Capacity:</label>
          <input
            className="form-control"
            type="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div className="col">
          <label className="form-label">Country:</label>
          <input
            className="form-control"
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </div>
        <div className="col">
          <label className="form-label">City:</label>
          <input
            className="form-control"
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div class="col">
          {" "}
          <label className="form-label">Postcode:</label>
          <input
            className="form-control"
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </div>
        <div class="col">
          <label className="form-label">Street:</label>
          <input
            className="form-control"
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </div>
        <div class="col">
          <label className="form-label">House number:</label>
          <input
            className="form-control"
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div class="col">
          <label className="form-label">Longitude:</label>
          <input
            className="form-control"
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </div>
        <div class="col">
          <label className="form-label">Latitude:</label>
          <input
            className="form-control"
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </div>
      </div>

      <div className="row mb-3">
        <div class="col">
          <label className="form-label">Date:</label>
          <input
            className="form-control"
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div class="col">
          <label className="form-label">Duration in minutes:</label>
          <input
            className="form-control"
            type="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </div>
      </div>

      <div class="mb-3">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          onChange={(e) => setDescription(e.target.value)}
        >
          {description}
        </textarea>
      </div>

      <div className="form-check mb-3">
        <input
          className="form-check-input"
          type="checkbox"
          id="isParentRequired"
          name="isParentRequired"
          checked={isParentRequired}
          onChange={handleChange}
        />
        <label htmlFor="isParentRequired" className="form-check-label">
          Parents are required
        </label>
      </div>
      <button type="submit" onClick={submitForm} className="btn btn-primary">
        Post!
      </button>
    </form>
  );
}
