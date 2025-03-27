import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { request } from "../../axios_Helper.js";
import "./googleMapComponentEdit.scss";
import { useContext } from "react";
import { FormDirtyContext } from "../../components/context/FormDirtyContext";

import useUnsavedChangesWarning from "../../components/hook/useUnsavedChangesWarning";
import Modal from "../modal/Modal.jsx";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 3.215438,
  lng: 101.727046,
};

const GoogleMapComponentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAA-nIxqwHbKjtRrfn089ZJnChKLU87yn8",
    libraries: ["geometry", "places", "routes"],
  });
  const { isFormDirty, setIsFormDirty } = useContext(FormDirtyContext);

  const { open, setOpen, nextPath, handleNavigation } =
    useUnsavedChangesWarning(isFormDirty);

  const [markerPositions, setMarkerPositions] = useState([]);
  const [directions, setDirections] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    if (markerPositions.length > 0) {
      setIsFormDirty(true);
    }
  }, [markerPositions, setIsFormDirty]);

  const handleMapClick = async (event) => {
    if (!event.latLng) return;

    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    console.log("Clicked Lat:", lat, "Lng:", lng);

    const stopName = await getPlaceName(lat, lng);

    setMarkerPositions((prevPositions) => [
      ...prevPositions,
      {
        lat: lat,
        lng: lng,
        name: stopName,
      },
    ]);
  };

  const getPlaceName = async (lat, lng) => {
    const apiKey = "AIzaSyAA-nIxqwHbKjtRrfn089ZJnChKLU87yn8"; // Replace with your API key
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.results.length > 0) {
        // Look for a place name (e.g., bus stop, landmark, etc.)
        for (let result of data.results) {
          for (let component of result.address_components) {
            if (
              component.types.includes("establishment") || // Business or landmark
              component.types.includes("point_of_interest") || // General POI
              component.types.includes("bus_station") || // Bus stop/station
              component.types.includes("transit_station")
            ) {
              return component.long_name; // Return the meaningful place name
            }
          }
        }

        // If no name found, return a shorter formatted address (e.g., street name)
        return data.results[0].formatted_address.split(",")[0];
      } else {
        return "Unknown Stop"; // Default if no results found
      }
    } catch (error) {
      console.error("Error fetching place name:", error);
      return "Unknown Stop"; // Fallback in case of error
    }
  };

  const handleMarkerRightClick = (index) => {
    setMarkerPositions((prevPositions) => {
      const updatedMarkers = prevPositions.filter((_, i) => i !== index);

      if (updatedMarkers.length < 2) {
        setDirections(null); // Clear the route when fewer than 2 markers remain
        setTotalDistance(0);
      }

      return updatedMarkers;
    });
  };

  useEffect(() => {
    const fetchRouteData = async () => {
      if (!id) return;

      try {
        const response = await request(
          "GET",
          `http://localhost:8090/api/v1/routes/${id}`,
          {}
        );

        const { busStops, routeTotalDistance } = response.data;

        // Update state with retrieved data
        setMarkerPositions(
          busStops.map((stop) => ({
            lat: stop.lat,
            lng: stop.lng,
            name: stop.stopName,
          }))
        );

        setTotalDistance(routeTotalDistance);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRouteData();
  }, [id]);

  useEffect(() => {
    if (markerPositions.length < 2) {
      setDirections(null); // Clear previous directions
      setTotalDistance(0);
      return;
    }

    const calculateRoute = () => {
      setDirections(null); // Force rerender by clearing existing route

      const directionsService = new window.google.maps.DirectionsService();
      const origin = markerPositions[0];
      const destination = markerPositions[markerPositions.length - 1];

      const waypoints = markerPositions.slice(1, -1).map((position) => ({
        location: new window.google.maps.LatLng(position.lat, position.lng),
        stopover: true,
      }));

      directionsService.route(
        {
          origin: new window.google.maps.LatLng(origin.lat, origin.lng),
          destination: new window.google.maps.LatLng(
            destination.lat,
            destination.lng
          ),
          waypoints,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            let distance = 0;
            result.routes[0].legs.forEach((leg) => {
              distance += leg.distance.value;
            });
            setTotalDistance(distance / 1000); // Convert meters to km
          } else {
            console.error("Error fetching directions:", status);
            setDirections(null);
          }
        }
      );
    };

    calculateRoute();
  }, [markerPositions]);

  const handleAddBusStop = async () => {
    if (!id) {
      console.error("No route ID found.");
      return;
    }

    const busStops = markerPositions.map((pos) => ({
      stopName: pos.name,
      lat: pos.lat,
      lng: pos.lng,
    }));

    console.log("Sending bus stops data:", busStops); // 🔍 Check if lat/lng are correct

    try {
      const response = await request(
        "PUT",
        `http://localhost:8090/api/v1/routes/${id}/addBusStops`,
        {
          busStops,
          totalDistance,
        }
      );

      console.log("Bus stops added successfully:", response.data);
      alert("Bus stops added successfully!");
      setIsFormDirty(false);

      navigate(`/routes/${id}/viewStop`);
    } catch (error) {
      console.error("Error adding bus stops:", error);
      alert(
        "Failed to add bus stops. You need to select stops only can submit"
      );
    }
  };

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <>
      <div className="googleContent2">
        <div className="google">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={handleMapClick}
          >
            {markerPositions.map((position, index) => (
              <Marker
                key={index}
                position={position}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker
                }}
                onRightClick={() => handleMarkerRightClick(index)}
              />
            ))}
            {directions && markerPositions.length > 1 && (
              <DirectionsRenderer directions={directions} />
            )}
          </GoogleMap>
        </div>
        <div className="markerPositions">
          <h3>Marker Position List (For updated)</h3>
          <p>Old record will be removed after submit</p>
          <br />
          {markerPositions.length > 0 ? (
            <div className="infoContainer">
              {markerPositions.map((position, index) => (
                <div className="info">
                  <div className="inner-info">
                    <span>Bus Stop No: {index + 1}</span> <br />
                    <span>Bus Stop Name: {position.name}</span> <br />
                    <span>Latitude: {position.lat}</span>
                    <br />
                    <span>Longitude: {position.lng}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No record...</p>
          )}
        </div>{" "}
        <div className="totalDistance">
          <h3>Total Distance: {totalDistance.toFixed(2)} km</h3>
        </div>
        <div className="form-footer">
          <button
            type="submit"
            className="submit-btn"
            onClick={() => handleNavigation(`/routes/${id}/viewStop`)}
          >
            Back
          </button>
          <button
            type="submit"
            className="submit-btn"
            onClick={handleAddBusStop}
          >
            <img src="/media/upload.svg" className="icon" alt="" />
            SAVE BUS STOP
          </button>
        </div>
      </div>

      {open && (
        <Modal setOpen={setOpen} type="unsavedChanged" nextPath={nextPath} />
      )}
    </>
  );
};

export default GoogleMapComponentEdit;
