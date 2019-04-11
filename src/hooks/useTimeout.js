import { useState, useEffect, useCallback } from "react";

const useTimeout = time => {
  const [isOver, setIsOver] = useState(false);
  const endTimeout = useCallback(() => setIsOver(true), []);

  useEffect(
    () => {
      const timeout = setTimeout(endTimeout, time);

      return () => clearTimeout(timeout);
    },
    [endTimeout, time]
  );

  return isOver;
};

export default useTimeout;
