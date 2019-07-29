const useURLParam = (
  key: string,
  defaultValue: string
): [string, (newParam: string) => void] => {
  const currentParam : string | null = new URLSearchParams(window.location.search).get(key);
  const param : string = currentParam === null ? defaultValue : currentParam;

  const setURLParam = (newParam: string): void => {
    const newURL: URL = new URL(window.location.href);
    if (newParam !== null) {
      newURL.searchParams.set(key, newParam);
    } else {
      newURL.searchParams.delete(key);
    }
    window.history.pushState({}, "", newURL.href);
  };

  return [param, setURLParam];
};

export default useURLParam;
