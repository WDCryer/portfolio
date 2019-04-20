const useURLParam = (key, defaultValue) => {
  const currentParam = new URLSearchParams(window.location.search).get(key);
  const param = currentParam === null ? defaultValue : currentParam;

  const setURLParam = newParam => {
    const newURL = new URL(window.location.href);
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
