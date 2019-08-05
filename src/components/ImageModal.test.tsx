import {
  act,
  fireEvent,
  getByTestId,
  queryByTestId,
  render
} from "react-testing-library";

import { BrowserRouter } from "react-router-dom";
import ImageModal from "./ImageModal";
import React from "react";
import { getAll } from "../api/images";
import IHistory from "../interfaces/History";
import IImage from "../interfaces/Image";

describe("ImageModal component", () => {
  const allImages: IImage[] = getAll();
  const firstImage: IImage = allImages[0];
  const lastImage: IImage = allImages[allImages.length - 1];

  let history: IHistory;

  beforeEach(() => {
    history = {
      push: jest.fn()
    };
  });

  describe("next image", () => {
    it("should have a navigation link to the next image", () => {
      const modal = render(
        <BrowserRouter>
          <ImageModal
            match={{ params: { id: firstImage.id } }}
            history={history}
          />
        </BrowserRouter>
      );

      const nextUrlMatch: RegExp = new RegExp(`/image/${firstImage.next}$`);
      const nextButton = getByTestId(modal.container, "next-button");
      expect(nextButton).toHaveProperty(
        "href",
        expect.stringMatching(nextUrlMatch)
      );

      expect(window.location.href).not.toMatch(nextUrlMatch);

      fireEvent.click(nextButton);

      expect(window.location.href).toMatch(nextUrlMatch);
    });

    it("should not have a navigation link to the next image when you are on the last image", () => {
      let modal;

      act(() => {
        modal = render(
          <BrowserRouter>
            <ImageModal
              match={{ params: { id: lastImage.id } }}
              history={history}
            />
          </BrowserRouter>
        );
      });

      const nextButton = queryByTestId(modal.container, "next-button");

      expect(nextButton).toBeNull();
    });

    it("should be requested when you press the right arrow key", () => {
      const modal = render(
        <BrowserRouter>
          <ImageModal
            match={{ params: { id: firstImage.id } }}
            history={history}
          />
        </BrowserRouter>
      );

      fireEvent.keyDown(modal.container, { key: "ArrowRight" });

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith(`/image/${firstImage.next}`);
    });

    it("should not requested when you press the right arrow key on the last image", () => {
      const modal = render(
        <BrowserRouter>
          <ImageModal
            match={{ params: { id: lastImage.id } }}
            history={history}
          />
        </BrowserRouter>
      );

      fireEvent.keyDown(modal.container, { key: "ArrowRight" });

      expect(history.push).not.toHaveBeenCalled();
    });
  });

  describe("previous image", () => {
    it("should have a navigation link to the previous image", () => {
      const modal = render(
        <BrowserRouter>
          <ImageModal
            match={{ params: { id: lastImage.id } }}
            history={history}
          />
        </BrowserRouter>
      );

      const previousUrlMatch = new RegExp(`/image/${lastImage.previous}$`);
      const previousButton = getByTestId(modal.container, "previous-button");

      expect(previousButton).toHaveProperty(
        "href",
        expect.stringMatching(previousUrlMatch)
      );
      expect(window.location.href).not.toMatch(previousUrlMatch);

      fireEvent.click(previousButton);

      expect(window.location.href).toMatch(previousUrlMatch);
    });

    it("should not have a navigation link to the previous image when you are on the first image", () => {
      let modal;

      act(() => {
        modal = render(
          <BrowserRouter>
            <ImageModal
              match={{ params: { id: firstImage.id } }}
              history={history}
            />
          </BrowserRouter>
        );
      });

      const previousButton = queryByTestId(modal.container, "previous-button");

      expect(previousButton).toBeNull();
    });

    it("should be requested when you press on the left arrow key", () => {
      const modal = render(
        <BrowserRouter>
          <ImageModal
            match={{ params: { id: lastImage.id } }}
            history={history}
          />
        </BrowserRouter>
      );

      fireEvent.keyDown(modal.container, { key: "ArrowLeft" });

      expect(history.push).toHaveBeenCalledTimes(1);
      expect(history.push).toHaveBeenCalledWith(`/image/${lastImage.previous}`);
    });

    it("should not be requested when you press on the left arrow key and are viewing the first image", () => {
      const modal = render(
        <BrowserRouter>
          <ImageModal
            match={{ params: { id: firstImage.id } }}
            history={history}
          />
        </BrowserRouter>
      );

      const currentUrl = window.location.href;

      fireEvent.keyDown(modal.container, { key: "ArrowLeft" });

      expect(history.push).not.toHaveBeenCalled();
      expect(window.location.href).toEqual(currentUrl);
    });
  });
});
