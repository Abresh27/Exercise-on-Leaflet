import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";

export default function CustomPane() {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = L.map("mapDiv").setView([9.0062817, 38.775609], 13);
      map.createPane("labels");
      map.getPane("labels").style.zIndex = 650;
      var positron = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png",
        {
          attribution: "©OpenStreetMap, ©CartoDB",
        }
      ).addTo(map);

      var positronLabels = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png",
        {
          attribution: "©OpenStreetMap, ©CartoDB",
          pane: "labels",
        }
      ).addTo(map);

      //   var geojson = L.geoJson(GeoJsonData, geoJsonOptions).addTo(map);

      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, []);
  return <div id="mapDiv" ref={mapRef}></div>;
}
