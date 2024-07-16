import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./index.css";
// import "esri-leaflet/dist/esri-leaflet.css";
import * as EL from "esri-leaflet"; //or import { basemapLayer } from "esri-leaflet";
export default function WebandTileMapService() {
  //Using useRef to ensure that the map is initialized only once
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current) {
      //Setting up the map
      const map = L.map("mapDiv2").setView([9.0062817, 38.775609], 2);

      //**********WMS in Leaflet***********

      //Create a L.TileLayer.WMS layer to use the WMS offered by Mundialis
      //   var wmsLayer = L.tileLayer
      //     .wms("http://ows.mundialis.de/services/service?", {
      //       layers: "TOPO-OSM-WMS",
      //     })
      //     .addTo(map);

      //Combine different layers to swich layers with layers layers control
      // var basemaps = {
      //   Topography: L.tileLayer.wms(
      //     "http://ows.mundialis.de/services/service?",
      //     {
      //       layers: "TOPO-WMS",
      //     }
      //   ),

      //   Places: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
      //     layers: "OSM-Overlay-WMS",
      //   }),

      //   SRTM30: L.tileLayer.wms("http://ows.mundialis.de/services/service?", {
      //     layers: "SRTM30-Hillshade",
      //   }),

      //   "Topography, then places": L.tileLayer.wms(
      //     "http://ows.mundialis.de/services/service?",
      //     {
      //       layers: "TOPO-WMS,OSM-Overlay-WMS",
      //     }
      //   ),

      //   "Places, then topography": L.tileLayer.wms(
      //     "http://ows.mundialis.de/services/service?",
      //     {
      //       layers: "OSM-Overlay-WMS,TOPO-WMS",
      //     }
      //   ),
      // };
      // L.control.layers(basemaps).addTo(map);
      // basemaps.Topography.addTo(map);

      //********TMS in Leaflet*********
      // Create an Esri basemap layer using the URL
      //1)Using URLs- Esri provides various basemap services, and their URLs are usually in the format
      //https://server.arcgisonline.com/ArcGIS/rest/services/{service_name}/MapServer/tile/{z}/{y}/{x}   //Replace the 'service_name' with the map service you want

      // L.tileLayer(
      //   "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
      //   {
      //     attribution: '&copy; <a href="https://www.esri.com">Esri</a>',
      //   }
      // ).addTo(map);

      //2)Using `Esri Leaflet` plugin- To integrate Esri's ArcGIS base map services into your web map created using Esri Leaflet plugin
      // Create an Esri basemap layer and add it to the map
      const esriBasemapLayer = EL.basemapLayer("Topographic").addTo(map);

      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, []);
  return (
    <div>
      <h1>Map with WMS and TMS Layer offered</h1>
      <p>See what layers are available in a WMS server (QGIS)</p>
      <img
        src="https://leafletjs.com/examples/wms/qgis-wms-layers.png"
        alt=""
      />
      <p>
        Some of the common basemap (TMS) service provided by Esri:
        <ul>
          <li>World Imagery : World_Imagery</li>
          <li>World Street Map : World_Street_Map</li>
          <li>World Topographic Map: World_Topo_Map</li>
          <li>World Terrain Base: World_Terrain_Base</li>
          <li>World Shaded Relief: World_Shaded_Relief</li>
          <li>World Physical Map: World_Physical_Map</li>
          <li>National Geographic World Map: NatGeo_World_Map</li>
          <li>World Light Gray Base: World_Light_Gray_Base</li>
          <li>World Dark Gray Base: World_Dark_Gray_Base</li>
        </ul>
      </p>
      <div id="mapDiv2" ref={mapRef}></div>
    </div>
  );
}
