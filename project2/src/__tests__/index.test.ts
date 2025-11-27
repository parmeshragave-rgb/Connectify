import rootReducer from "../Redux/index";

describe("rootReducer", () => {
  test("returns initial state structure", () => {
    const state = rootReducer(undefined, { type: "@@INIT" });

    expect(state).toHaveProperty("auth");
    expect(state).toHaveProperty("quotes");
    expect(state).toHaveProperty("users");
    expect(state).toHaveProperty("like");
  });

  test("handles unknown action correctly", () => {
    const prevState = rootReducer(undefined, { type: "@@INIT" });

    const newState = rootReducer(prevState, { type: "UNKNOWN_ACTION" });

    expect(newState).toEqual(prevState);
  });
});