"use client";
import { useState, useRef } from "react";

import { GoogleMap, useLoadScript, Marker, Autocomplete } from "@react-google-maps/api";

const Map = () => {
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [searchLngLat, setSearchLngLat] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const autoCompleteRef = useRef(null);
    const [address, setAddress] = useState("");

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "",
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;

    const center = { lat: 38.539895, lng: -121.754247 };

    const handlePlaceChanged = () => {
        const place = autoCompleteRef.current.getPlace();
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
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                gap: "20px",
            }}
        >
            <Autocomplete
                onLoad={(autocomplete) => {
                    console.log("Autocomplete loaded:", autocomplete);
                    autoCompleteRef.current = autocomplete;
                }}
                onPlaceChanged={handlePlaceChanged}
                options={{ fields: ["address_components", "geometry", "name"] }}
            >
                <input type="text" placeholder="Search for a location" />
            </Autocomplete>

            <GoogleMap
                zoom={currentLocation || selectedPlace ? 18 : 15}
                center={currentLocation || searchLngLat || center}
                mapContainerClassName="map"
                mapContainerStyle={{ width: "80%", height: "600px", margin: "auto" }}
                onLoad={onMapLoad}
            >
                {selectedPlace && <Marker position={searchLngLat} />}
                {currentLocation && <Marker position={currentLocation} />}
            </GoogleMap>
        </div>
    );
};

export default Map;
