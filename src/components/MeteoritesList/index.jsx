import MeteoriteCard from "./MeteoriteCard";

const MeteoritesList = ({
  meteorites,
  setSelectedMeteorite,
  setHoveredMeteorite,
}) => {
  if (meteorites.length === 0) {
    return <p>No meteorites on the map</p>;
  }

  return (
    <>
      <i className="side-box__info">
        {meteorites.length} meteorites on the map
      </i>
      <ul className="meteorites">
        {meteorites.map((meteorite) => (
          <MeteoriteCard
            key={meteorite.id}
            meteorite={meteorite}
            setSelectedMeteorite={setSelectedMeteorite}
            setHoveredMeteorite={setHoveredMeteorite}
          />
        ))}
      </ul>
    </>
  );
};

export default MeteoritesList;
