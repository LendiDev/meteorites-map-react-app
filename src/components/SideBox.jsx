import MeteoritesList from "./MeteoritesList";

const SideBox = ({ meteorites, isLoading }) => {

  return (
    <section className="side-box">
      <h2>Meteorite Landings</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <MeteoritesList meteorites={meteorites} />
      )}
    </section>
  );
};

export default SideBox;
