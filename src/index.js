import React, { StrictMode, Suspense, lazy } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Loader from "./components/Loader";
import Header from "./components/Header";

const PortfolioPage = lazy(() => import("./components/PortfolioPage"));

function App() {
  return (
    <StrictMode>
      <div className="App">
        <section id="modal" />
        <Header />
        <Suspense fallback={<Loader />}>
          <PortfolioPage />
        </Suspense>
      </div>
    </StrictMode>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
