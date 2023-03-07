export const fetchMeteoritesForBounds = ({ _ne, _sw }) => {
  return fetch(`
  https://data.nasa.gov/api/id/gh4g-9sfh.json?%24SELECT=*&%24WHERE=geolocation.latitude %3C '${_ne.lat}' AND geolocation.latitude %3E '${_sw.lat}' AND geolocation.longitude %3C '${_ne.lng}' AND geolocation.longitude %3E '${_sw.lng}' AND geolocation.longitude !%3D '0' AND geolocation.latitude !%3D '0'&%24LIMIT=999999&%24order=reclat`).then(
    (data) => data.json()
  );
};
