import { useState, useEffect, useCallback } from "react";

const useTimeout = (time: number): boolean => {
  const [isOver, setIsOver] = useState(false);
  const endTimeout: () => void = useCallback(() => setIsOver(true), []);

  useEffect(() => {
    const timeout = setTimeout(endTimeout, time);

    return () => clearTimeout(timeout);
  }, [endTimeout, time]);

  return isOver;
};

export default useTimeout;
