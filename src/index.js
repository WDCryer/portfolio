import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import PortfolioPage from "./components/PortfolioPage";
import "./styles.css";

function App() {
  return (
    <StrictMode>
      <div className="App">
        <section id="modal" />
        <PortfolioPage />
      </div>
    </StrictMode>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
