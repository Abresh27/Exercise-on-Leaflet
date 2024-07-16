import React, { useEffect, useRef } from "react";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
export default function MapPopupShapeIcons() {
  //Using useRef to ensure that the map is initialized only once
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      //Setting up the map
      //Initialize the map and set its view to chosen geographical coordinates and a zoom level
      const map = L.map("mapDiv").setView([9.0062817, 38.775609], 13);

      //Add a tile layer to add to the map, in this case it’s a OpenStreetMap tile layer
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      //Markers and popup
      //Add marker
      const marker = L.marker([9.0062817, 38.775609]).addTo(map);
      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();

      //Add Circle
      var circle = L.circle([9.008, 38.76], {
        color: "red",
        fillColor: "#f03",
        fillOpacity: 0.5,
        radius: 500,
      }).addTo(map);

      //Adding a polygon is as easy:
      var polygon = L.polygon([
        [9.006655, 38.740581],
        [9.000448, 38.747242],
        [9.007896, 38.750007],
      ]).addTo(map);

      //Working with popups
      marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
      circle.bindPopup("I am a circle.");
      polygon.bindPopup("I am a polygon.");

      //Popup as a Layer
      var popup = L.popup()
        .setLatLng([9.025274, 38.749253])
        .setContent("I am a standalone popup.")
        .openOn(map);

      //Adding Icons on the map
      var treeIcon = L.icon({
        iconUrl: "/tree.png",
        iconSize: [38, 60],
      });
      //Putting a marker with this icon on a map
      L.marker([9.019032, 38.73745], { icon: treeIcon })
        .addTo(map)
        .bindPopup("I'm a tree icon");

      //Dealing with events
      //Using Alert
      //     function onMapClick(e) {
      //       alert("You clicked the map at " + e.latlng);
      //     }

      //     map.on("click", onMapClick);
      // var popup = L.popup();

      //Using popup
      function onMapClick(e) {
        popup
          .setLatLng(e.latlng)
          .setContent("You clicked the map at " + e.latlng.toString())
          .openOn(map);
      }
      map.on("click", onMapClick);

      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, []);
  return <div id="mapDiv" ref={mapRef}></div>;
}
