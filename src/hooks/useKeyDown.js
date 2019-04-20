import { useCallback, useEffect } from "react";

const useKeyDown = (key, callback) => {
  const handler = useCallback(
    event => {
      if (event.key === key) {
        callback(event);
      }
    },
    [key, callback]
  );

  useEffect(() => {
    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [handler]);
};

export default useKeyDown;
