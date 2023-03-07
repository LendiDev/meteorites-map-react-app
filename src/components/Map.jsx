import "mapbox-gl/dist/mapbox-gl.css";
import { useEffect, useRef, useState } from "react";
import Map, { Layer, Marker, Source } from "react-map-gl";
import mapboxToken from "../config/mapBoxToken";
import { fetchMeteoritesForBounds } from "../utils/api";
import { generateMeteoriteFeatures } from "../utils/generateMeteoriteFeatures";
import {
  clusterCountLayer,
  clusterLayer,
  unclusteredPointLayer,
} from "./Layers";

const MapView = ({ setMeteorites, setIsLoading, selectedMeteorite }) => {
  const [sourceFeatures, setSourceFeatures] = useState();
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      const { reclong, reclat } = selectedMeteorite;

      mapRef.current.flyTo({
        center: [+reclong, +reclat],
        zoom: 12,
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

  const onMapClick = (event) => {
    const feature = event.features[0];

    console.log(event)

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
        duration: 500,
      });
    });
  };

  return (
    <Map
      ref={mapRef}
      onLoad={handleOnLoadMap}
      onMoveEnd={handleOnChange}
      onZoomEnd={handleOnChange}
      mapboxAccessToken={mapboxToken()}
      interactiveLayerIds={[clusterLayer.id]}
      onClick={onMapClick}
      initialViewState={{
        longitude: -2.2385166878479463,
        latitude: 53.47258388177494,
        zoom: 8,
      }}
      className="map"
      minZoom={5}
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
      <Marker latitude={53.47258388177494} longitude={-2.2385166878479463}>
        <div className="northcoders-special_box">
          <p>Northcoders 🚀</p>
        </div>
      </Marker>
    </Map>
  );
};

export default MapView;
