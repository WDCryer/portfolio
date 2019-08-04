import React from "react";
import { render, fireEvent } from "react-testing-library";
import ImageGallery from "./ImageGallery";
import { BrowserRouter } from "react-router-dom";
import { getAll } from "../api/images";
import IImageData from "../interfaces/ImageData";

describe("Image Gallery component", () => {
  const images: IImageData[] = getAll();

  it("should display the images", () => {
    const { queryByTestId } = render(
      <BrowserRouter>
        <ImageGallery images={images} />
      </BrowserRouter>
    );

    images.forEach(({ id }) => {
      const thumbnail = queryByTestId(`thumbnail-${id}`);

      expect(thumbnail).toBeDefined();

      const nextUrlMatch: RegExp = new RegExp(`/image/${id}`);

      expect(thumbnail).toHaveProperty(
        "href",
        expect.stringMatching(nextUrlMatch)
      );

      if (thumbnail) {
        fireEvent.click(thumbnail);
      }

      expect(window.location.href).toMatch(nextUrlMatch);
    });
  });
});
