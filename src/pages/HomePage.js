import { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useHistory } from "react-router-dom";
import { filterActivites } from "../Lib/filterActivites";
import { selectUser } from "../store/user/selectors";
import "./HomePage.css";

import Activity from "../components/Activity";
import SearchForm from "../components/SearchForm";
import { addUserActivity } from "../store/user/actions";

import { loadActivities } from "../store/activities/actions";
import { showMessageWithTimeout } from "../store/appState/actions";
import {
  selectActivitiesLoading,
  selectActivities,
} from "../store/activities/selectors";

export default function HomePage() {
  const { token, isProvider } = useSelector(selectUser);
  const dispatch = useDispatch();
  const history = useHistory();
  const loading = useSelector(selectActivitiesLoading);
  const allActivities = useSelector(selectActivities);
  const [filteredActivities, setFilteredActivities] = useState(allActivities);

  useEffect(() => {
    if (!allActivities.length) dispatch(loadActivities());
    setFilteredActivities(allActivities);
  }, [allActivities, dispatch]);

  const onAdd = (id) => {
    dispatch(addUserActivity(id));
  };

  const triggerFilter = (conditions) => {
    // create new array with only activities that match conditions
    const activitiesFiltered = filterActivites(allActivities, conditions);

    if (activitiesFiltered.length === 0) {
      dispatch(
        showMessageWithTimeout(
          "danger",
          true,
          "No results found for your search"
        )
      );
    } else {
      setFilteredActivities(activitiesFiltered);
    }
  };

  const onPopupClick = (activityId) => {
    history.push(`/activities/${activityId}`);
  };

  return (
    <div class="homepage mb-5">
      <div className="above-header">
        <Carousel fade className="carousel">
          <Carousel.Item>
            <img
              src="header.jpeg"
              className="above-header-image"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="header2.jpeg"
              className="above-header-image"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src="header3.jpeg"
              className="above-header-image"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div>
      <div className="header">
        <h1>List activities for your child with us!</h1>
        <p>Find the best local kids activities and classes for all ages.</p>
      </div>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div className="container">
          {/* Search form and map */}
          <div className="search-container">
            <SearchForm triggerFilter={triggerFilter} />

            <MapContainer
              className="map"
              center={[52.36994, 4.906]}
              zoom={13}
              scrollWheelZoom={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {filteredActivities.map((activity) => (
                // the marker is every pointer you see on the map
                <Marker
                  key={activity.title}
                  position={[
                    activity.address.latitude,
                    activity.address.longitude,
                  ]}
                >
                  {/* when we click on the marker, we see the popup */}
                  <Popup>
                    <img
                      alt={activity.title}
                      style={{ width: "100px", borderRadius: "0.5em" }}
                      src={activity.imageUrl}
                    />
                    <p>{activity.title}</p>
                    <button onClick={() => onPopupClick(activity.id)}>
                      More
                    </button>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Activities */}
          <div className="activities-container">
            {filteredActivities.map((activity) => (
              <div key={activity.id} class="activity-item">
                <Activity activity={activity} />
                {token && !isProvider ? (
                  <button
                    onClick={() => onAdd(activity.id)}
                    className="btn btn-outline-secondary"
                  >
                    Add to my calendar
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
