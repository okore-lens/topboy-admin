import { Route, Routes } from "react-router-dom";
import "./App.css";
import Events from "./components/events/Events";
import Navbar from "./components/navbar/Navbar";
import Services from "./components/services/Services";

function App() {
  return (
    <div className="App">
      <h1>Topboy Admin</h1>
      <Navbar />
      <Routes>
        <Route path="/" element={<Events />} />
        <Route path="/services" element={<Services />} />
      </Routes>

      {/* <Images /> */}
    </div>
  );
}

export default App;
