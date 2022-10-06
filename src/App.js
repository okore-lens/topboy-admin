import { Route, Routes } from "react-router-dom";
import "./App.css";
import Events from "./components/layout/pages/events/Events";
import Navbar from "./components/layout/navbar/Navbar";
import Services from "./components/layout/pages/services/Services";
import Mixes from "./components/layout/pages/mixes/Mixes";

function App() {
  return (
    <div className="App">
      <div className="nav">
        <Navbar />
      </div>

      <div className="section">
        <Routes>
          <Route path="/" element={<Events />} />
          <Route path="/services" element={<Services />} />
          <Route path='/mixes' element={<Mixes></Mixes>}></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
