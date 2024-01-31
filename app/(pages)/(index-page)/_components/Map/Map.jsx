"use client";
import { useState, useRef } from "react";

import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const Map = () => {
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
                {selectedPlace && <Marker position={searchLngLat} />}
                {currentLocation && <Marker position={currentLocation} />}
            </GoogleMap>
        </div>
    );
};

export default Map;
