import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "./index.css";

export default function CurrentUserLocation() {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = L.map("mapDiv").fitWorld();
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      //Geolocation
      //Zooming the map view to the detected location and specify 16 as the maximum zoom
      map.locate({ setView: true, maxZoom: 16 });

      //Add a marker in the detected location, showing accuracy in a popup, by adding an event listener to locationfound event before the locateAndSetView call
      function onLocationFound(e) {
        var radius = e.accuracy;

        L.marker(e.latlng)
          .addTo(map)
          .bindPopup("You are within " + radius + " meters from this point")
          .openPopup();

        L.circle(e.latlng, radius).addTo(map);
      }
      map.on("locationfound", onLocationFound);

      //Error message if the geolocation failed:
      function onLocationError(e) {
        alert(e.message);
      }
      map.on("locationerror", onLocationError);

      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, []);
  return <div id="mapDiv" ref={mapRef}></div>;
}
