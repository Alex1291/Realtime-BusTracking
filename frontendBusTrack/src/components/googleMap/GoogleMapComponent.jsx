import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  useJsApiLoader,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { useParams } from "react-router-dom";
import { request } from "../../axios_Helper.js";
import "./googleMapComponent.scss";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 3.215438,
  lng: 101.727046,
};

const GoogleMapComponent = () => {
  const { id } = useParams();
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAA-nIxqwHbKjtRrfn089ZJnChKLU87yn8",
    libraries: ["geometry", "places", "routes"],
  });

  const [markerPositions, setMarkerPositions] = useState([]);
  const [directions, setDirections] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);

  useEffect(() => {
    const fetchRouteData = async () => {
      if (!id) return;

      try {
        const response = await request(
          "GET",
          `http://localhost:8090/api/v1/routes/${id}`,
          {}
        );

        const { route_stops, routeTotalDistance } = response.data;

        let routeTotalDistanceNum = Number(routeTotalDistance);

        let busStops = route_stops;

        // Update state with retrieved data
        setMarkerPositions(
          busStops.map((stop) => {
            console.log("latNum: " + stop.lat);
            console.log("lngNum: " + stop.lng);

            return {
              lat: stop.lat,
              lng: stop.lng,
              name: stop.stopName,
            };
          })
        );

        setTotalDistance(routeTotalDistanceNum);
      } catch (error) {
        console.error("Error fetching route data:", error);
      }
    };

    fetchRouteData();
  }, [id]);

  useEffect(() => {
    if (!isLoaded || markerPositions.length < 2) {
      setDirections(null); // Clear directions if less than 2 markers
      setTotalDistance(0);
      return;
    }

    const calculateRoute = () => {
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
            setDirections(null); // Ensure the directions are cleared on failure
          }
        }
      );
    };

    calculateRoute();
  }, [isLoaded, markerPositions]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <div className="googleContent1">
      <div className="google">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {markerPositions.map((position, index) => (
            <Marker
              key={index}
              position={position}
              icon={{
                url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Red marker
              }}
            />
          ))}

          {directions && markerPositions.length > 1 && (
            <DirectionsRenderer directions={directions} />
          )}
        </GoogleMap>
      </div>
      <div className="markerPositions">
        <h3>Marker Position List</h3>
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
      </div>

      <div className="totalDistance">
        <h3>Total Distance: {totalDistance.toFixed(2)} km</h3>
      </div>
    </div>
  );
};

export default GoogleMapComponent;
