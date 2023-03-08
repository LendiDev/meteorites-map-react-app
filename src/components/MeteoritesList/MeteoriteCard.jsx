const MeteoriteCard = ({
  meteorite,
  setSelectedMeteorite,
  setHoveredMeteorite,
}) => {
  const { fall, year, mass, reclat, reclong, recclass } = meteorite;
  const handleOnMeteoriteInfoClicked = () => {
    setSelectedMeteorite(meteorite);
  };

  const handleFocusMeteorite = () => {
    setHoveredMeteorite(meteorite);
  };

  const handleUnFocusMeteorite = () => {
    setHoveredMeteorite(null);
  };

  return (
    <li
      className="meteorites__card"
      onMouseEnter={handleFocusMeteorite}
      onMouseLeave={handleUnFocusMeteorite}
    >
      <button
        className="meteorites__button"
        onFocus={handleFocusMeteorite}
        onClick={handleOnMeteoriteInfoClicked}
        aria-label={`Fly to ${meteorite.name} on a map`}
      >
        {meteorite.name}
      </button>
      <i>
        (long: {reclat}, lat: {reclong})
      </i>
      <p>
        {fall} in {year && year.substring(0, 4)}
      </p>
      <p>Class: {recclass}</p>
      {mass && <p>Mass: {mass}g</p>}
    </li>
  );
};

export default MeteoriteCard;
