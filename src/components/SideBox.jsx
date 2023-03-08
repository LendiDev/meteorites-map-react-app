import MeteoritesList from "./MeteoritesList";

const SideBox = ({
  meteorites,
  isLoading,
  setSelectedMeteorite,
  setHoveredMeteorite,
}) => {
  return (
    <section className="side-box">
      <h2>Meteorite Landings</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <MeteoritesList
          meteorites={meteorites}
          setSelectedMeteorite={setSelectedMeteorite}
          setHoveredMeteorite={setHoveredMeteorite}
        />
      )}
    </section>
  );
};

export default SideBox;
