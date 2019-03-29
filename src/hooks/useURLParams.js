const useURLParams = () => {
  let urlParams = new URLSearchParams(window.location.search);

  const setURLParams = newURLParams => {
    const newURL = new URL(window.location.href);
    newURL.search = newURLParams.toString();
    urlParams = newURLParams;
    window.history.pushState({}, "", newURL.href);
  };
  return [urlParams, setURLParams];
};

export default useURLParams;
