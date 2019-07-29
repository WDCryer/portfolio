import { useCallback, useEffect } from "react";

type Callback = (event: KeyboardEvent) => void

type UseKeyDown = (
  key: string,
  callback: Callback 
) => void;

const useKeyDown: UseKeyDown = (
  key: string,
  callback: Callback
): void => {
  const handler: Callback = useCallback(
    (event: KeyboardEvent) : void => {
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
