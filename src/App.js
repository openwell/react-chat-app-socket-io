import React from "react";
import Dashboard from "./components/Dashboard";
import "./App.css";
import {Store} from "./store/Store";

function App() {
  return (
    <div className="App">
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
