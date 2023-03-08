import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, { Layer, Source, Marker, Popup } from "react-map-gl";
import mapboxToken from "../config/mapBoxToken";
import { fetchMeteoritesForBounds } from "../utils/api";
import { generateMeteoriteFeatures } from "../utils/generateMeteoriteFeatures";
import {
  clusterCountLayer,
  clusterLayer,
  singlePointLayer,
} from "../data/layers";

const MapView = ({
  setMeteorites,
  setIsLoading,
  selectedMeteorite,
  setSelectedMeteorite,
  hoveredMeteorite,
  setHoveredMeteorite,
}) => {
  const [sourceFeatures, setSourceFeatures] = useState();
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current && selectedMeteorite) {
      const { reclong, reclat } = selectedMeteorite;

      mapRef.current.flyTo({
        center: [+reclong, +reclat],
        zoom: 14,
        duration: 1000,
      });
    }
  }, [selectedMeteorite]);

  const fetchMeteoriteLandings = () => {
    const { getBounds } = mapRef.current;
    setIsLoading(true);

    fetchMeteoritesForBounds(getBounds()).then((data) => {
      setSourceFeatures(generateMeteoriteFeatures(data));
      setMeteorites(data);
      setIsLoading(false);
    });
  };

  /* Map event listeners */
  const handleOnLoadMap = () => {
    fetchMeteoriteLandings();
  };

  const handleOnChange = () => {
    fetchMeteoriteLandings();
  };

  const handleOnChangeStart = () => {
    setHoveredMeteorite(null);
  };

  const onMapClick = (event) => {
    const feature = event.features[0];

    if (!feature) return;

    if (feature.layer.id === "single-point") {
      const { meteoriteDetails } = feature.properties;
      setSelectedMeteorite(JSON.parse(meteoriteDetails));
    }

    if (feature.layer.id === "clusters") {
      const clusterId = feature.properties.cluster_id;
      const mapboxSource = mapRef.current.getSource("meteorite-landings");

      mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
        if (err) return;

        mapRef.current.easeTo({
          center: feature.geometry.coordinates,
          zoom,
          duration: 500,
        });
      });
    }
  };

  return (
    <Map
      ref={mapRef}
      onLoad={handleOnLoadMap}
      onMoveEnd={handleOnChange}
      onZoomEnd={handleOnChange}
      onDragStart={handleOnChangeStart}
      onZoomStart={handleOnChangeStart}
      mapboxAccessToken={mapboxToken()}
      interactiveLayerIds={[clusterLayer.id, singlePointLayer.id]}
      onClick={onMapClick}
      initialViewState={{
        longitude: -2.2385166878479463,
        latitude: 53.47258388177494,
        zoom: 6,
      }}
      className="map"
      minZoom={4}
      mapStyle="mapbox://styles/mapbox/dark-v11"
    >
      {sourceFeatures && (
        <Source
          id="meteorite-landings"
          type="geojson"
          data={sourceFeatures}
          cluster={true}
          clusterMaxZoom={14}
          clusterRadius={50}
        >
          <Layer {...clusterLayer} />
          <Layer {...clusterCountLayer} />
          <Layer {...singlePointLayer} />
        </Source>
      )}
      {hoveredMeteorite && (
        <Marker
          latitude={hoveredMeteorite.reclat}
          longitude={hoveredMeteorite.reclong}
        >
          <div className="marker-point" />
        </Marker>
      )}
      {selectedMeteorite && (
        <Popup
          longitude={selectedMeteorite.reclong}
          latitude={selectedMeteorite.reclat}
          anchor="bottom"
          onClose={() => setSelectedMeteorite(null)}
          style={{ color: "black" }}
        >
          <h2>{selectedMeteorite.name}</h2>
          <i>
            (long: {selectedMeteorite.reclat}, lat: {selectedMeteorite.reclong})
          </i>
          <p>
            {selectedMeteorite.fall} in{" "}
            {selectedMeteorite.year && selectedMeteorite.year.substring(0, 4)}
          </p>
          <p>Class: {selectedMeteorite.recclass}</p>
          {selectedMeteorite.mass && <p>Mass: {selectedMeteorite.mass}g</p>}
        </Popup>
      )}
    </Map>
  );
};

export default MapView;
