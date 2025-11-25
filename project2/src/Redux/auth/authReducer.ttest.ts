import authReducer from "./authReducer";
import { loginSuccess, logout } from "./authActions";

describe("Auth Reducer", () => {
  const initialState = {
    user: null,
    token: null,
    isAuthenticated: false,
  };

  test("should return initial state", () => {
    const state = authReducer(undefined, {});
    expect(state).toEqual(initialState);
  });

  test("should handle LOGIN_SUCCESS", () => {
    const user = { username: "Parmesh", email: "Parmesh@mail.com" };
    const token = "token123";

    const action = loginSuccess(user, token);

    const state = authReducer(initialState, action);

    expect(state).toEqual({
      user,
      token,
      isAuthenticated: true,
    });
  });

  test("should handle LOGOUT", () => {
    const loggedInState = {
      user: { username: "john" },
      token: "abc",
      isAuthenticated: true,
    };

    const action = logout();

    const state = authReducer(loggedInState, action);

    expect(state).toEqual(initialState);
  });
});