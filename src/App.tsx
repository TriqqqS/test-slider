import React from "react";
import "./App.css";
import Slider from "./components/Slider/Slider";

function App() {
  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <h1>Полезные материалы</h1>
          <p>
            Собрали для вас полезные исследования схемы кормления и другие материалы, которые
            пригодятся для лучших результатов на вашем хозяйстве
          </p>
        </div>
        <Slider />
      </div>
    </div>
  );
}

export default App;
