import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { filterActivites } from "../Lib/filterActivites";

import Activity from "../components/Activity";
import SearchForm from "../components/SearchForm";
import { addUserActivity } from "../store/user/actions";

import { loadActivities } from "../store/activities/actions";
import {
  selectActivitiesLoading,
  selectActivities,
} from "../store/activities/selectors";

export default function HomePage() {
  const dispatch = useDispatch();

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
    setFilteredActivities(activitiesFiltered);
  };

  return (
    <div>
      <h1>List activities for your child with us!</h1>
      {loading ? (
        <em>Loading...</em>
      ) : (
        <div>
          <SearchForm triggerFilter={triggerFilter} />
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              margin: "0 -10px",
            }}
          >
            <MapContainer
              style={{
                border: "2px solid",
                borderRadius: "10px",
                height: "50vw",
                width: "60vw",
                maxWidth: "1000px",
                maxHeight: "800px",
                margin: "0px 18%",
              }}
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
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
            {filteredActivities.map((activity) => (
              <div key={activity.id}>
                <Activity activity={activity} />
                <button onClick={() => onAdd(activity.id)}>
                  Add to my calendar
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
