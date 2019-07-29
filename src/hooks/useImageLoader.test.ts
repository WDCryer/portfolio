import { renderHook, act } from "@testing-library/react-hooks";
import useImageLoader from "./useImageLoader";

describe("useImageLoader hook", () => {
  test("should load an image", () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageLoader("../andrew.jpg")
    );

    expect(result.current).toBeTruthy();

    waitForNextUpdate();

    expect(result.current).toBeFalsy();
  });
});
