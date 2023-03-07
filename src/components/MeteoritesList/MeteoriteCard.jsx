const MeteoriteCard = ({ meteorite, setSelectedMeteorite }) => {
  const { fall, year, mass, reclat, reclong, recclass } = meteorite;
  const handleOnMeteoriteInfoClicked = () => {
    setSelectedMeteorite(meteorite);
  };

  return (
    <li className="meteorites__card">
      <button
        className="meteorites__button"
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
      <p>Mass: {mass}g</p>
    </li>
  );
};

export default MeteoriteCard;
