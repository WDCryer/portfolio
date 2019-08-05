import React, { StrictMode, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { getAll } from "./api/images";
import ModalContext from "./contexts/Modal";
import Header from "./components/Header";
import ImageGallery from "./components/ImageGallery";

const App = () => {
  const images = getAll();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <StrictMode>
      <BrowserRouter>
        <ModalContext.Provider value={{ isModalOpen, setIsModalOpen }}>
          <main className={isModalOpen ? "blur" : ""}>
            <Header />
            <ImageGallery images={images} />
          </main>
        </ModalContext.Provider>
      </BrowserRouter>
    </StrictMode>
  );
};

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
