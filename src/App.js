import { Route, Routes } from "react-router-dom";
import "./App.css";
import Events from "./components/layout/pages/events/Events";
import Navbar from "./components/layout/navbar/Navbar";
import Services from "./components/layout/pages/services/Services";

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
