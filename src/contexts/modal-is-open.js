import { createContext } from "react";

const context = createContext({
  isModalOpen: false,
  dispatch: () => {}
});

export default context;
