import React from "react";
import Cards from "./Cards/Cards";
import Homepage from "./Homepage/Homepage";
import Navbar from "./Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Homepage />
      <Cards />
    </div>
  );
}


export default App;
