import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "./index.css";

export default function LayerGroupsAndControl() {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      //Create a bunch of layers to combine into a group to handle them as one
      var aratKilo = L.marker([9.033358, 38.763113]).bindPopup("Arat Kilo"),
        megenagna = L.marker([9.018693, 38.801651]).bindPopup("Megenagna"),
        piyassa = L.marker([9.035943, 38.752427]).bindPopup("Piyassa"),
        autobusTera = L.marker([9.033824, 38.732171]).bindPopup("Autobus Tera");

      //Combines the location markers into one layer using the LayerGroup class
      var locations = L.layerGroup([aratKilo, megenagna, piyassa, autobusTera]);

      //Create the base layers
      var osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      });

      var osmHOT = L.tileLayer(
        "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
        {
          maxZoom: 19,
          attribution:
            "© OpenStreetMap contributors, Tiles style by Humanitarian OpenStreetMap Team hosted by OpenStreetMap France",
        }
      );

      //Creat a map and add the default created base layers to the map
      var map = L.map("mapDiv", {
        center: [9.0062817, 38.775609],
        zoom: 13,
        layers: [osm, locations],
      });

      //Create two objects the first that contain base layers, the other contain the overlays, and the option
      var baseMaps = {
        OpenStreetMap: osm,
        "<span style='color: red'>OpenStreetMap.HOT</span>": osmHOT,
      };
      var overlayMaps = {
        Locations: locations,
      };
      var option = {
        collapsed: false,
      };

      //Create a Layers Control and add it to the map
      var layerControl = L.control
        .layers(baseMaps, overlayMaps, option)
        .addTo(map);

      //Alternativly we can also add or remove base layers or overlays dynamically
      var shegerPark = L.marker([9.023737, 38.759594]).bindPopup(
          "Sheger Park."
        ),
        ambasadorPark = L.marker([9.017337, 38.757781]).bindPopup(
          "Ambasador Park."
        );

      var parks = L.layerGroup([shegerPark, ambasadorPark]);
      var openTopoMap = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          maxZoom: 13,
          attribution:
            "Map data: © OpenStreetMap contributors, SRTM | Map style: © OpenTopoMap (CC-BY-SA)",
        }
      );

      layerControl.addBaseLayer(openTopoMap, "OpenTopoMap");
      layerControl.addOverlay(parks, "Parks");

      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, []);

  return <div ref={mapRef} id="mapDiv"></div>;
}
