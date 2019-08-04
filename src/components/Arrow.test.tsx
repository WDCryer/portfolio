import React from "react";
import Arrow, { Direction } from "./Arrow";

describe("Arrow component", () => {
  const directions: Direction[] = ["right", "left", "up", "down"];

  test.each(directions)(
    "should render properly with direction %s",
    (direction): void => {
      expect(<Arrow direction={direction} />).toMatchSnapshot();
    }
  );
});
