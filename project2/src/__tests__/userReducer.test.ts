
import UserReducer, { IntialStateUsers } from "../Redux/Users/userReducer";
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../Redux/Users/userActions";

describe("UserReducer", () => {
  const initialState: IntialStateUsers = {
    loading: false,
    userdata: [],
    error: "",
  };

  test("returns initial state when called without state", () => {
    const result = UserReducer(undefined, { type: "UNKNOWN" } as any);
    expect(result).toEqual(initialState);
  });

  test("handles FETCH_USERS action", () => {
    const action = { type: FETCH_USERS };
    const result = UserReducer(initialState, action as any);
    expect(result.loading).toBe(true);
    expect(result.userdata).toEqual([]);
    expect(result.error).toBe("");
  });

  test("handles FETCH_USERS_SUCCESS action", () => {
    const payload = [{ id: 1, name: "parmesh" }];
    const action = { type: FETCH_USERS_SUCCESS, payload } as any;
    const result = UserReducer({ ...initialState, loading: true }, action);
    expect(result.loading).toBe(false);
    expect(result.userdata).toEqual(payload);
    expect(result.error).toBe("");
  });

  test("handles FETCH_USERS_FAILURE action", () => {
    const action = { type: FETCH_USERS_FAILURE, payload: "error" } as any;
    const result = UserReducer({ ...initialState, loading: true }, action);
    expect(result.loading).toBe(false);
    expect(result.userdata).toEqual([]);
    expect(result.error).toBe("error");
  });
});
