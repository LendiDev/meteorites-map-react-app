import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useState } from "react";
import Map, { Layer, Source } from "react-map-gl";
import mapboxToken from "../config/mapBoxToken";
import { fetchMeteoritesForBounds } from "../utils/api";
import { generateMeteoriteFeatures } from "../utils/generateMeteoriteFeatures";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./Layers";

const MapView = ({ meteorites, setMeteorites, setIsLoading }) => {
  const [sourceFeatures, setSourceFeatures] = useState();
  const mapRef = useRef();

  const handleOnChange = () => {
    const { getBounds } = mapRef.current;
    setIsLoading(true);

    fetchMeteoritesForBounds(getBounds()).then((data) => {
      setSourceFeatures(generateMeteoriteFeatures(data));
      setMeteorites(data);
      setIsLoading(false);
    });
  };

  const onClick = (event) => {
    const feature = event.features[0];

    if (!feature) return;
    const clusterId = feature.properties.cluster_id;
    const point_count = feature.properties.point_count;
    const mapboxSource = mapRef.current.getSource("meteorite-landings");

    mapboxSource.getClusterLeaves(
      clusterId,
      point_count,
      0,
      (err, aFeatures) => {
        if (err) return;
        // TODO: use features to show info in popup.
        // console.log(aFeatures);
      }
    );

    mapboxSource.getClusterExpansionZoom(clusterId, (err, zoom) => {
      if (err) return;

      mapRef.current.easeTo({
        center: feature.geometry.coordinates,
        zoom,
        duration: 300,
      });
    });
  };

  return (
    <Map
      ref={mapRef}
      onMoveEnd={handleOnChange}
      onZoomEnd={handleOnChange}
      mapboxAccessToken={mapboxToken()}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={onClick}
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14,
      }}
      className="map"
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
          <Layer {...unclusteredPointLayer} />
        </Source>
      )}
    </Map>
  );
};

export default MapView;
