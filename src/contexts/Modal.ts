import { createContext } from "react";

export default createContext({
  isModalOpen: false,
  setIsModalOpen: (isModalOpen: boolean) => {}
});
