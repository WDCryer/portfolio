import { useContext } from "react";
import Modal from "./Modal";
import { renderHook } from "@testing-library/react-hooks";

describe("Modal context", () => {
  it("should contain a boolean state and a setter function", () => {
    const { result } = renderHook(() => useContext(Modal));
    const { isModalOpen, setIsModalOpen } = result.current;

    expect(typeof isModalOpen).toBe("boolean");
    expect(typeof setIsModalOpen).toBe("function");
  });
});
