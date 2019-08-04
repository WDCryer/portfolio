import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface Props {
  readonly children: ReactNode;
}

const ModalPortal = ({ children }: Props) => {
  const target: Element | null = document.getElementById("modal");

  return target ? createPortal(children, target) : null;
};

export default ModalPortal;
