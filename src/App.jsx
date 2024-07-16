import { Link, Route, Routes } from "react-router-dom";
import MapPopupShapeIcons from "./Components/MapPopupShapeIcons";
import CurrentUserLocation from "./Components/CurrentUserLocation";
import GeoJSONInLeaflet from "./Components/GeoJSONInLeaflet";
import InteractiveChoroplethMap from "./Components/InteractiveChoroplethMap";
import LayerGroupsAndControl from "./Components/LayerGroupsAndControl";
import WebandTileMapService from "./Components/WebandTileMapService";
import CustomPane from "./Components/CustomPane";
import "./App.css";
function Home() {
  return (
    <div>
      <h1>Exercise on Leaflet</h1>
      <ul>
        <h2>Setting up Map, Markers, popups, and polylines</h2>
        <li>
          Setting up a Leaflet map (with OpenStreetMap tiles) on your page,
          working with markers, polylines and popups, and dealing with events.
        </li>
        <br />
        <Link to="/map-markers-popups">
          Setting up Map, Markers, popups, and polylines
        </Link>
        <h2>Current User Location</h2>
        <li>
          Create a fullscreen map tuned for mobile devices like iPhone, iPad or
          Android phones, and how to easily detect and use the current user
          location.
        </li>
        <br />
        <Link to="/leaflet-on-mobile">
          Leaflet on mobile, current user location
        </Link>

        <h2>Using GeoJSON with Leaflet</h2>
        <li>
          Create and interact with map vectors created from GeoJSON objects.
        </li>
        <br />
        <Link to="/geoJSON-in-leaflet">Using GeoJSON with Leaflet</Link>

        <h2>Interactive Choropleth Map</h2>
        <li>
          Creating a colorful interactive choropleth map of US States Population
          Density with the help of GeoJSON and some custom controls.
        </li>
        <br />
        <Link to="/choropleth-map">Interactive Choropleth Map</Link>

        <h2>Layer Groups and Layers Control</h2>
        <li>
          Group several layers into one, and how to use the layers control to
          allow users to easily switch different layers on your map
        </li>
        <br />
        <Link to="/layer-groups-control">Layer Groups and Control</Link>

        <h2>Web and Tile Map Service(WMS and TMS)</h2>
        <li>
          How to integrate with WMS and TMS services from professional GIS
          software.
        </li>
        <p>
          TMS stands for tiled map service, and is a map tiling standard more
          focused on web maps, very similar to the map tiles that Leaflet
          expects in a L.TileLayer. <br />
          <br />
          WMTS, for web map tile service, is the standard protocol for map tiles
          and serves map tiles directly usable in a L.TileLayer
        </p>
        <br />
        <Link to="/WMS-and-TMS">Web and Tile Map Service(WMS and TMS)</Link>

        <h2>Working with map panes</h2>
        <li>
          How the default map panes work to display overlays on top of tiles,
          and how to override that.
        </li>
        <br />
        <Link to="/custom-pane">Custom Pane</Link>
      </ul>
    </div>
  );
}
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/leaflet-on-mobile" element={<CurrentUserLocation />} />
        <Route path="/map-markers-popups" element={<MapPopupShapeIcons />} />
        <Route path="/geoJSON-in-leaflet" element={<GeoJSONInLeaflet />} />
        <Route path="/choropleth-map" element={<InteractiveChoroplethMap />} />
        <Route
          path="/layer-groups-control"
          element={<LayerGroupsAndControl />}
        />
        <Route path="/WMS-and-TMS" element={<WebandTileMapService />} />
        <Route path="/custom-pane" element={<CustomPane />} />
      </Routes>
    </>
  );
}

export default App;
