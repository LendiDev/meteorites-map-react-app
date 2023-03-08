import { useState } from "react";
import "./App.css";
import MapView from "./components/Map";
import SideBox from "./components/SideBox";

function App() {
  const [meteorites, setMeteorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMeteorite, setSelectedMeteorite] = useState(null);
  const [hoveredMeteorite, setHoveredMeteorite] = useState(null);

  return (
    <div className="App">
      <main>
        <MapView
          setIsLoading={setIsLoading}
          setMeteorites={setMeteorites}
          meteorites={meteorites}
          selectedMeteorite={selectedMeteorite}
          setHoveredMeteorite={setHoveredMeteorite}
          hoveredMeteorite={hoveredMeteorite}
          setSelectedMeteorite={setSelectedMeteorite}
        />
        <SideBox
          isLoading={isLoading}
          meteorites={meteorites}
          setSelectedMeteorite={setSelectedMeteorite}
          setHoveredMeteorite={setHoveredMeteorite}
        />
      </main>
    </div>
  );
}

export default App;
