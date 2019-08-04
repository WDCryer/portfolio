import React from "react";
import { render } from "react-testing-library";
import ModalPortal from "./ModalPortal";

describe("ModalPortal", () => {
  // TODO see if there is a cleaner way to add a modal div to the DOM
  const portalRoot = document.createElement("div");

  portalRoot.setAttribute("id", "modal");

  beforeEach(() => {
    document.body.appendChild(portalRoot);
  });

  afterEach(() => {
    document.body.removeChild(portalRoot);
  });

  it("should display the child element", () => {
    const { queryByText } = render(<ModalPortal>test</ModalPortal>);

    expect(queryByText("test")).toBeDefined();
  });
});
