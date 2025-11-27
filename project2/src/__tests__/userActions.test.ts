import {
  fetchUsersSucess,
  fetchUsers,
  fetchUsersFailure,
  fetchUsersData,
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
} from "../Redux/Users/userActions";

import axios from "axios";

jest.mock("axios");

describe("user Actions", () => {
  test("fetchUsers returns correct action", () => {
    const action = fetchUsers();

    expect(action).toEqual({
      type: FETCH_USERS,
    });
  });

  test("fetchUsersFailure returns correct action", () => {
    const error = "error";
    const action = fetchUsersFailure(error);

    expect(action).toEqual({
      type: FETCH_USERS_FAILURE,
      payload: error,
    });
  });

  test("fetchUsersSucess returns correct action", () => {
    const usersdata = [{ id: 1, firstName: "Tknendwdw", image: "" }];
    const action = fetchUsersSucess(usersdata);

    expect(action).toEqual({
      type: FETCH_USERS_SUCCESS,
      payload: usersdata,
    });
  });

  test("fetchUsersData dispatches actions on success", async () => {
    const users = [{ id: 1, username: "a" }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { users } });

    const dispatch = jest.fn();

   
    dispatch(fetchUsersData())
    

    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_USERS });
    await new Promise((r) => setTimeout(r, 0));

    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_USERS_SUCCESS,
      payload: users,
    });
  });

  test("fetchUsersData dispatches failure on axios error", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("error"));
    const dispatch = jest.fn();

    fetchUsersData()(dispatch);

    await new Promise((r) => setTimeout(r, 0));

    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_USERS });
    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_USERS_FAILURE,
      payload: "error",
    });
  });
});


