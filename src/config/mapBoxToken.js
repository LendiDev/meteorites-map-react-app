const mapboxToken = () => {
  const { REACT_APP_MAPBOX_API } = process.env;

  if (!REACT_APP_MAPBOX_API) {
    alert("REACT_APP_MAPBOX_API is not set!");
  }

  return REACT_APP_MAPBOX_API;
};

export default mapboxToken;
