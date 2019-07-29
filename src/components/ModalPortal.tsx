import { createPortal } from "react-dom";
import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode
}

const ModalPortal = ({ children } : Props) =>
  createPortal(children, document.getElementById("modal"));

export default ModalPortal;
