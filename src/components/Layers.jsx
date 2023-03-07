export const clusterLayer = {
  id: "clusters",
  type: "circle",
  source: "meteorite-landings",
  filter: ["has", "point_count"],
  paint: {
    "circle-color": [
      "step",
      ["get", "point_count"],
      "#51bbd6",
      100,
      "#f1f075",
      750,
      "#f28cb1",
    ],
    "circle-radius": ["step", ["get", "point_count"], 20, 100, 30, 750, 40],
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "meteorite-landings",
  filter: ["has", "point_count"],
  layout: {
    "text-field": "{point_count_abbreviated}",
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 15,
  },
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "meteorite-landings",
  filter: ["!", ["has", "point_count"]],
  paint: {
    "circle-color": "#B22222",
    "circle-radius": 6,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff",
  },
};
