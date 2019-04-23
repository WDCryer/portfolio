import { createPortal } from "react-dom";

const ModalPortal = ({ children }) =>
  createPortal(children, document.getElementById("modal"));

export default ModalPortal;
