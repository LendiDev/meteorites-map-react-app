import { useState } from "react";
import "./App.css";
import MapView from "./components/Map";
import SideBox from "./components/SideBox";

function App() {
  const [meteorites, setMeteorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="App">
      <main>
        <MapView
          setIsLoading={setIsLoading}
          setMeteorites={setMeteorites}
          meteorites={meteorites}
        />
        <SideBox isLoading={isLoading} meteorites={meteorites} />
      </main>
    </div>
  );
}

export default App;
