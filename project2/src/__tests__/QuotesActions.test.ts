import {
  fetchQuerySuccess,
  fetchQuery,
  fetchQueryFailure,
   fetchQuerydata,
  FETCH_QUERY,
  FETCH_QUERY_SUCCESS,
  FETCH_QUERY_FAILURE,
} from "../Redux/Quotes/QuotesActions";

import axios from "axios";

jest.mock("axios");

describe("quotes Actions", () => {
  test("fetchQuery returns correct action", () => {
    const action = fetchQuery();

    expect(action).toEqual({
      type: FETCH_QUERY,
    });
  });

  test("fetchQueryFailure returns correct action", () => {
    const error = "error";
    const action = fetchQueryFailure(error);

    expect(action).toEqual({
      type: FETCH_QUERY_FAILURE,
      payload: error,
    });
  });

  test("fetchQuerySuccess returns correct action", () => {
    const usersdata = [{ id: 1, firstName: "Tknendwdw", image: "" }];
    const action = fetchQuerySuccess(usersdata);

    expect(action).toEqual({
      type: FETCH_QUERY_SUCCESS,
      payload: usersdata,
    });
  });

  test("fetchUsersData dispatches actions on success", async () => {
    const users = [{ id: 1, username: "a" }];
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { users } });

    const dispatch = jest.fn();

   
    dispatch(fetchQuerydata())
    

    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_QUERY });
    await new Promise((r) => setTimeout(r, 0));

    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_QUERY_SUCCESS,
      payload: users,
    });
  });

  test("fetchUsersData dispatches failure on axios error", async () => {
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error("error"));
    const dispatch = jest.fn();

    fetchQuerydata()(dispatch);


    expect(dispatch).toHaveBeenCalledWith({ type: FETCH_QUERY });
    await new Promise((r) => setTimeout(r, 0));

    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_QUERY_FAILURE,
      payload: "error",
    });
  });
});


