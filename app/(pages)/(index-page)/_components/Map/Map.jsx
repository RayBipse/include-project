"use client";
import { useState, useRef, Fragment } from "react";
import { PostButton, PostMenu } from "../Post/Post";
import Gallery from "../Gallery/Galley";
import { GoogleMap, useLoadScript, Marker, Autocomplete, Circle } from "@react-google-maps/api";

const Map = ({ setArea, setGalleryDisplay }) => {
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

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: process.env.google_map_api,
        libraries: ["places"],
    });

    if (!isLoaded) return <div>Loading...</div>;

    const center = { lat: 38.539895, lng: -121.754247 };

    const onMapLoad = (map) => {
        const controlDiv = document.createElement("div");
        map.controls[window.google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
    };

    return (
        <div
            style={{
                height: "100%",
                flex: "1 1 auto",
            }}
        >
            <GoogleMap
                zoom={15}
                center={center}
                mapContainerClassName="map"
                mapContainerStyle={{ width: "100vw", height: "100%", margin: "auto" }}
                onLoad={onMapLoad}
            >
                {gridPoints.map((point) => (
                    <Fragment key={point.id}>
                        <Circle
                            key={point.id}
                            center={point.position}
                            radius={270}
                            options={{
                                strokeColor: "blue",
                                strokeOpacity: 0.2,
                                strokeWeight: 1,
                                fillColor: "blue",
                                fillOpacity: 0.2,
                            }}
                            onClick={() => {
                                setArea(point.id);
                                setGalleryDisplay(true);
                            }}
                        />
                        <Marker
                            position={point.position}
                            label={{
                                text: `${point.id}`,
                                color: "white",
                            }}
                        />
                    </Fragment>
                ))}
            </GoogleMap>
        </div>
    );
};

export default Map;
