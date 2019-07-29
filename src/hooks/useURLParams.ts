const useURLParams = (): [any, (newURLParams: URLSearchParams) => void] => {
  let urlParams: URLSearchParams = new URLSearchParams(window.location.search);

  const setURLParams = (newURLParams: URLSearchParams) => {
    const newURL: URL = new URL(window.location.href);
    newURL.search = newURLParams.toString();
    urlParams = newURLParams;
    window.history.pushState({}, "", newURL.href);
  };
  return [urlParams, setURLParams];
};

export default useURLParams;
