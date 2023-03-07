const generateFeature = (meteorite) => {
  const { latitude, longitude } = meteorite.geolocation;
  const feature = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [+longitude, +latitude],
    },
    properties: {
      __row_id__: meteorite.id,
      count: "1",
      meteoriteDetails: meteorite,
    },
  };

  return feature;
};

export const generateMeteoriteFeatures = (meteorites) => {
  const featureCollection = {
    type: "FeatureCollection",
    features: [...meteorites].map((meteorite) => generateFeature(meteorite)),
    crs: {
      type: "name",
      properties: {
        name: "urn:ogc:def:crs:OGC:1.3:CRS84",
      },
    },
  };

  return featureCollection;
};
