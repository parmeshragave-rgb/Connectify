import { loginSuccess, logout, LOGIN_SUCCESS, LOGOUT } from "./authActions";

describe("Auth Actions", () => {
  test("loginSuccess returns correct action", () => {
    const user = { username: "parmesh", email: "parmesh@mail.com" };
    const token = "12345678";

    const action = loginSuccess(user, token);

    expect(action).toEqual({
      type: LOGIN_SUCCESS,
      payload: { user, token },
    });
  });

  test("logout returns correct action", () => {
    const action = logout();

    expect(action).toEqual({ type: LOGOUT });
  });
});