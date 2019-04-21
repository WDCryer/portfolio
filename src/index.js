import React, { StrictMode, Suspense, lazy, useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Loader from "./components/Loader";
import Header from "./components/Header";
import OpenModalContext from "./contexts/modal-is-open";
import openModalReducer from "./reducers/modal-is-open";

const PortfolioPage = lazy(() => import("./components/PortfolioPage"));

const App = () => {
  const [isModalOpen, dispatch] = useReducer(openModalReducer, false);

  return (
    <StrictMode>
      <OpenModalContext.Provider value={{ isModalOpen, dispatch }}>
        <section id="modal" />
        <main className={isModalOpen ? "blur" : ""}>
          <Header />
          <Suspense fallback={<Loader />}>
            <PortfolioPage />
          </Suspense>
        </main>
      </OpenModalContext.Provider>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
