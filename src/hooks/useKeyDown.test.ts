import { renderHook } from "@testing-library/react-hooks";
import useKeyDown from "./useKeyDown";
import { fireEvent } from "react-testing-library";

describe("useKeyDown hook", () => {
  it("should trigger a callback when the specified key is pressed", () => {
    const callback = jest.fn();

    renderHook(() => useKeyDown("a", callback));

    fireEvent.keyDown(window, { key: "a" });

    expect(callback).toBeCalledTimes(1);
  });

  it("should trigger a callback each time the specified key is pressed", () => {
    const callback = jest.fn();

    renderHook(() => useKeyDown("a", callback));

    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "a" });
    fireEvent.keyDown(window, { key: "a" });

    expect(callback).toBeCalledTimes(3);
  });

  it("should not trigger a callback when an unspecificied key is pressed", () => {
    const callback = jest.fn();

    renderHook(() => useKeyDown("a", callback));

    fireEvent.keyDown(window, { key: "b" });

    expect(callback).not.toBeCalled()
  });
});
