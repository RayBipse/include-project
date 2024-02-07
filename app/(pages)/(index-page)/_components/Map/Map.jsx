"use client";
import { useState, useRef } from "react";
import { PostButton, PostMenu } from "../Post/Post";

import { GoogleMap, useLoadScript, Marker, Autocomplete, Circle } from "@react-google-maps/api";

const Map = ({ menuRef }) => {
    const [showPostMenu, setShowPostMenu] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);
    const [gridPoints, setGridPoints] = useState([
        { id: 1, position: { lat: 38.543777, lng: -121.762821 } },
        { id: 2, position: { lat: 38.543777, lng: -121.755154 } },
        { id: 3, position: { lat: 38.543777, lng: -121.747304 } },
        { id: 4, position: { lat: 38.53873, lng: -121.763087 } },
        { id: 5, position: { lat: 38.53873, lng: -121.755154 } },
        { id: 6, position: { lat: 38.53873, lng: -121.747304 } },
        { id: 7, position: { lat: 38.533767, lng: -121.76298 } },
        { id: 8, position: { lat: 38.533767, lng: -121.755154 } },
        { id: 9, position: { lat: 38.533767, lng: -121.747304 } },
    ]);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchLngLat, setSearchLngLat] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const autocompleteRef = useRef(null);

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.google_map_api,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;

    const center = { lat: 38.539895, lng: -121.754247 };

    const handleGridPointClick = (point) => {
        console.log(`Clicked on grid point ${point.id}`, point.position);
        setSelectedPoint(point);
        setShowPostMenu(true);
    };

    const handleClosePostMenu = () => {
        setSelectedPoint(null);
        setShowPostMenu(false);
    };

    const handlePlaceChanged = () => {
        const place = autocompleteRef.current.getPlace();
        setSelectedPlace(place);
        setSearchLngLat({
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        });
        setCurrentLocation(null);
    };

    const onMapLoad = (map) => {
        const controlDiv = document.createElement("div");
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
    };

    return (
        <div
            style={{
                // display: "flex",
                // flexDirection: "column",
                // justifyContent: "center",
                // alignItems: "center",
                // gap: "20px",
                height: "100%",
                flex: "1 1 auto",
            }}
        >
            {/* <Autocomplete
                onLoad={(autocomplete) => {
                    console.log("Autocomplete loaded:", autocomplete);
                    autocompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handlePlaceChanged}
                options={{ fields: ["address_components", "geometry", "name"] }}
            >
                <input type="text" placeholder="Search for a location" />
            </Autocomplete> */}

            <GoogleMap
                zoom={currentLocation || selectedPlace ? 18 : 15}
                center={currentLocation || searchLngLat || center}
                mapContainerClassName="map"
                mapContainerStyle={{ width: "100vw", height: "100%", margin: "auto" }}
                onLoad={onMapLoad}
            >
                {gridPoints.map((point) => (
                    <Circle
                        key={point.id}
                        center={point.position}
                        radius={270}
                        onClick={() => handleGridPointClick(point)}
                        options={{
                            strokeColor: "blue",
                            strokeOpacity: 0.2,
                            strokeWeight: 1,
                            fillColor: "blue",
                            fillOpacity: 0.2,
                        }}
                    />
                ))}

                {selectedPlace && <Marker position={searchLngLat} />}
                {currentLocation && <Marker position={currentLocation} />}
            </GoogleMap>

            {showPostMenu && <PostMenu menuRef={menuRef} onClose={handleClosePostMenu} selectedPoint={selectedPoint} />}
        </div>
    );
};

export default Map;
