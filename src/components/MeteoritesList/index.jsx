const MeteoritesList = ({ meteorites }) => {
  if (meteorites.length === 0) {
    return <p>No meteorites on the map</p>;
  }

  return (
    <>
      <i className="side-box__info">{meteorites.length} meteorites on the map</i>
      <ul className="meteorites">
        {meteorites.map((meteorite) => (
          <li className="meteorites__card" key={meteorite.id}>
            {meteorite.name}
          </li>
        ))}
      </ul>
    </>
  );
};

export default MeteoritesList;
