import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
  }

  const handleChange = () => {
    setisParentRequired(!isParentRequired);
    console.log("handleChange");
  };

  return (
    <div>
      <h1>Post your event</h1>
      <form>
        <p>
          <label>
            Title:{" "}
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
        </p>
        <label>
          Image url:{" "}
          <input
            type="text"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </label>
        <img src={`${imageUrl}`} />
        <label>
          Category:{" "}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Street:{" "}
          <input
            type="text"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
        </label>
        <label>
          House number:{" "}
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </label>
        <label>
          Postcode:{" "}
          <input
            type="text"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
          />
        </label>
        <label>
          City:{" "}
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </label>
        <label>
          Longitude:{" "}
          <input
            type="text"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
          />
        </label>
        <label>
          Latitude:{" "}
          <input
            type="text"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
          />
        </label>
        <label>
          Country:{" "}
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label>
          Date:{" "}
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Duration in minutes:{" "}
          <input
            type="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />
        </label>
        <label>
          Capacity:{" "}
          <input
            type="capacity"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </label>
        <label>
          Description:{" "}
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Age group:{" "}
          <select
            value={ageGroupId}
            onChange={(e) => setAgeGroupId(e.target.value)}
          >
            {ageGroups.map((ageGroup) => (
              <option key={ageGroup.id} value={ageGroup.id}>
                {ageGroup.range}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="isParentRequired">
          <input
            type="checkbox"
            id="isParentRequired"
            name="isParentRequired"
            checked={isParentRequired}
            onChange={handleChange}
          />{" "}
          Parents are required
        </label>
        <p>
          <button type="submit" onClick={submitForm}>
            Post!
          </button>
        </p>
      </form>
    </div>
  );
}
