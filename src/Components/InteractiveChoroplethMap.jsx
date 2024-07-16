import React,{useRef,useEffect} from 'react'
import L, { tileLayer } from "leaflet"
import "leaflet/dist/leaflet.css";
import "./index.css"
import {statesData} from '../assets/us-states'


export default function InteractiveChoroplethMap() {
    const mapRef =useRef(null)
    useEffect(()=>{
if(mapRef.current){
    const map = L.map("mapDiv").setView([37.8, -96],4)
    var tile = tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(map)

//Function to bind popups to each feature
      function addPopup(feature, layer) {
        // does this feature have a property named popupContent?
        if (feature.properties && feature.properties.name) {
            layer.bindPopup(feature.properties.name);
        }
    }   

//Create a function that returns a color based on population density (the color code from `colorbrewer2.org`)
 function getColor(d){
return d > 1000 ? '#800026' :
d > 500  ? '#BD0026' :
d > 200  ? '#E31A1C' :
d > 100  ? '#FC4E2A' :
d > 50   ? '#FD8D3C' :
d > 20   ? '#FEB24C' :
d > 10   ? '#FED976' :
           '#FFEDA0';
}

//Define a styling function for the GeoJSON layer so that its fillColor depends on feature.properties.density property
function style(feature) {
  return {
      fillColor: getColor(feature.properties.density),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.7
  };
}

//Adding Interaction
//Define an event listener for layer mouseover event:
function highlightFeature(e){
  e.target.setStyle({
    weight: 5,
    color: '#666',
    dashArray: '',
    fillOpacity: 0.7
})
e.target.bringToFront() //Bring the hovered feature on the top 
}

//Function to reset the layer style to its default state when the mouseout using the resetStyle method 
var geojson;
function resetHighlight(e) {
  geojson.resetStyle(e.target);
}

//Define a click listener that zooms to the state using fitBounds method 
function zoomToFeature(e) {
  map.fitBounds(e.target.getBounds());
}

//Define function to add the listeners on state layers to use it in the onEachFeature option
function addListener(feature, layer) {
  layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
      click: zoomToFeature
  });
}

//Custom Info Control (see documentation)

//Custom Legend Control
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);


//Added the created GeoJSON objects to the map using a GeoJSON() layer method with the onEachFeature and the style option
 geojson = L.geoJSON(statesData,{onEachFeature : addPopup && addListener, style :style}).addTo(map)
      //Cleanup function from the useEffect hook when the component unmounts
      return () => {
        map.remove();
      };
}
    },[])
  return (
    <div id='mapDiv' ref={mapRef}></div>
  )
}
