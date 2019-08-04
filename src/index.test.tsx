describe("App component", () => {
  const root = document.createElement("div");

  root.setAttribute("id", "root");

  beforeEach(() => {
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
  });

  it("should mount", () => {
    require("./index");
  });
});
