import React, { StrictMode, Suspense, lazy, useReducer } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import Loader from "./components/Loader";
import Header from "./components/Header";
import ModalIsOpenContext from "./contexts/modal-is-open";
import ModalIsOpenReducer from "./reducers/modal-is-open";

const PortfolioPage = lazy(() => import("./components/PortfolioPage"));

const App = () => {
  const [isModalOpen, dispatch] = useReducer(ModalIsOpenReducer, false);
  return (
    <StrictMode>
      <ModalIsOpenContext.Provider value={{ isModalOpen, dispatch }}>
        <div className="App">
          <section id="modal" />
          <main className={isModalOpen ? "blur" : ""}>
            <Header />
            <Suspense fallback={<Loader />}>
              <PortfolioPage />
            </Suspense>
          </main>
        </div>
      </ModalIsOpenContext.Provider>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
