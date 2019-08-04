import { renderHook, act } from "@testing-library/react-hooks";
import useImageLoader from "./useImageLoader";
import AndrewImage from "../images/andrew_tn.jpg";

describe("useImageLoader hook", () => {
  it.todo(
    "should load an image" /*, async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useImageLoader(AndrewImage)
    );

    expect(result.current).toBeTruthy();

ReactDOM.render(<App />, rootElement);

    await waitForNextUpdate();

    expect(result.current).toBeFalsy();
  } */
  );
});
