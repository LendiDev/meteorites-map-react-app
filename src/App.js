import { useState } from "react";
import "./App.css";
import MapView from "./components/Map";
import SideBox from "./components/SideBox";

function App() {
  const [meteorites, setMeteorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMeteorite, setSelectedMeteorite] = useState(null);

  return (
    <div className="App">
      <main>
        <MapView
          setIsLoading={setIsLoading}
          setMeteorites={setMeteorites}
          meteorites={meteorites}
          selectedMeteorite={selectedMeteorite}
        />
        <SideBox isLoading={isLoading} meteorites={meteorites} setSelectedMeteorite={setSelectedMeteorite} />
      </main>
    </div>
  );
}

export default App;
