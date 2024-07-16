import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

export default function MainMap() {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = L.map("mapDiv").setView([8.988853, 38.782425], 12);

      const OSM = L.tileLayer(
        "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution: "© OpenStreetMap",
        }
      );

      // Fetch GeoJSON data and add it to the map (Anbesa Bus rout line)
      const anbesaBusRout = fetch("./AnbesaBusRout.json") //file need to be in the public folder
        //Convert the response to JSON using `response.json()`
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data);
        })
        .catch((error) => {
          console.error("Error loading the GeoJSON data:", error);
        });

      //(Sheger Bus rout line)
      const shegerBusRout = fetch("./ShegerBusRout.json") //file need to be in the public folder
        //Convert the response to JSON using `response.json()`
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data);
        })
        .catch((error) => {
          console.error("Error loading the GeoJSON data:", error);
        });

      //(Aiyance Bus rout line)
      const aliyancBusRout = fetch("./AlianceBusRout.json") //file need to be in the public folder
        //Convert the response to JSON using `response.json()`
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data);
        })

        .catch((error) => {
          console.error("Error loading the GeoJSON data:", error);
        });
      const baseLayer = {
        Open_Sttret_map: OSM,
      };

      const overlayLayer = {
        Anbesa_Bus_Routs: anbesaBusRout,
        Sheger_Bus_Routs: shegerBusRout,
        Aliyance_Bus_Routs: aliyancBusRout,
      };

      //Create a Layers Control and add it to the map
      const busRoutsLayerControl = L.control
        .layers(baseLayer, overlayLayer)
        .addTo(map);

      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, []);
  return <div id="mapDiv" ref={mapRef}></div>;
}
