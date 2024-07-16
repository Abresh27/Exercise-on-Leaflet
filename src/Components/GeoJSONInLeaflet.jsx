import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "./index.css";

export default function GeoJSONInLeaflet() {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      const map = L.map("mapDiv").setView([9.0062817, 38.775609], 13);
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map);

      //<************ Create GeoJSON point feature ***********>
      var geojsonFeature = {
        type: "Feature", //Required
        properties: {
          name: "Coors Field",
          amenity: "Baseball Stadium",
          popupContent: "This is where the point is created",
        },
        geometry: {
          type: "Point",
          coordinates: [38.745217, 9.015387], //[long,lat]
        }, //Required
      };

      //Added the created GeoJSON objects to the map using a GeoJSON() layer method
      L.geoJSON(geojsonFeature)
        .addTo(map)
        .bindPopup(geojsonFeature.properties.popupContent);
      //Alternatively, to add the GeoJSON create an empty GeoJSON layer and assign it to a variable
      // var myLayer = L.geoJSON().addTo(map);
      // myLayer.addData(geojsonFeature);

      //<************ Create GeoJSON line feature ***********>
      //GeoJSON objects may also be passed as an array of valid GeoJSON objects
      var myLines = [
        {
          type: "LineString",
          coordinates: [
            [38.752427, 9.01899],
            [38.751912, 9.024881],
            [38.75144, 9.02984],
          ],
        },
        {
          type: "LineString",
          coordinates: [
            [38.744617, 9.016447],
            [38.74835, 9.016743],
            [38.751612, 9.017083],
          ],
        },
      ];
      //The style option
      var myStyle = {
        color: "#e90a0a",
        weight: 5,
        opacity: 0.65,
      };

      L.geoJSON(myLines, {
        style: myStyle,
      }).addTo(map);

      //<************ Create GeoJSON Polygon feature ***********>
      var myPolygon = [
        {
          type: "Feature",
          properties: { noOfSide: "Four", show_on_map: true },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [38.756204, 9.025475],
                [38.7535, 9.025559],
                [38.753328, 9.023016],
                [38.75556, 9.023313],
                [38.756204, 9.025475],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: { noOfSide: "Three", show_on_map: true },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [38.739767, 9.023991],
                [38.73878, 9.022169],
                [38.742256, 9.022465],
                [38.739767, 9.023991],
              ],
            ],
          },
        },
        {
          type: "Feature",
          properties: { noOfSide: "Three", show_on_map: false },
          geometry: {
            type: "Polygon",
            coordinates: [
              [
                [38.764358, 9.028272],
                [38.765945, 9.026026],
                [38.763757, 9.025983],
                [38.764358, 9.028272],
              ],
            ],
          },
        },
      ];

      //Function to styles individual features based on their properties
      function style(myPolygon) {
        switch (myPolygon.properties.noOfSide) {
          case "Four":
            return { color: "#ff0000" };
          case "Three":
            return { color: "#0000ff" };
        }
      }

      L.geoJSON(myPolygon, {
        //Pass the styling function
        style: style,
        //Filter option can be used to control the visibility of GeoJSON features
        filter: function (myPolygon) {
          return myPolygon.properties.show_on_map;
        },
      }).addTo(map);

      //<************ Fetching GeoJSON Data from external JSON file ***********>
      // Fetch GeoJSON data and add it to the map
      fetch("./ShegerBusRout.json") //file need to be in the public folder
        //Convert the response to JSON using `response.json()`
        .then((response) => response.json())
        .then((data) => {
          L.geoJSON(data).addTo(map);
        })
        .catch((error) => {
          console.error("Error loading the GeoJSON data:", error);
        });

      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, []);

  return <div id="mapDiv" ref={mapRef}></div>;
}
