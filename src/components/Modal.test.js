import React from "react";
import {
  render,
  prettyDOM,
  fireEvent,
  getByTestId
} from "react-testing-library";
import { ModalForTests as Modal } from "./Modal";

describe("Modal component", () => {
  let onClose;
  let modal;

  beforeEach(() => {
    onClose = jest.fn();
    modal = render(<Modal onClose={onClose} />);
  });

  describe("close function", () => {
    it("should be called when the escape key is pressed", () => {
      fireEvent.keyDown(modal.container, { key: "Escape" });
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should be called when the close button is pressed", () => {
      const closeButton = getByTestId(modal.container, "close-button");

      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it("should be called when the modal background is clicked", () => {
      const closeButton = getByTestId(modal.container, "modal-container");

      fireEvent.click(closeButton);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
