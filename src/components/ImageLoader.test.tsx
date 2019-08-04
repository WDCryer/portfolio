import React from "react";
import { render } from "react-testing-library";
import ImageLoader from "./ImageLoader";

describe("ImageLoader component", () => {
  const image = {
    src: "../andrew.jpg",
    className: "",
    alt: "Test image",
    title: "Test Image"
  };

  it("should show a loader", () => {
    const { queryByTestId, queryByAltText } = render(
      <ImageLoader {...image} />
    );

    expect(queryByTestId("loader")).toBeDefined();
    expect(queryByAltText("Test image")).toBeNull();
  });

  it.todo("should load an image");
});
