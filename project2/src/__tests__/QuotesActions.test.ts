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
    const quote = [{ authour: "Ainsten", quote:"every action has a equal and opposite reaction" }];
    const action = fetchQuerySuccess(quote);

    expect(action).toEqual({
      type: FETCH_QUERY_SUCCESS,
      payload: quote,
    });
  });

  test("fetchQueryData dispatches actions on success", async () => {
    const quote = [{ authour: "Ainsten", quote:"every action has a equal and opposite reaction" }];
    
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { quote } });

    const dispatch = jest.fn();
     await dispatch(fetchQuerydata)
     
    
     expect(dispatch).toHaveBeenCalledWith({ type: FETCH_QUERY });

    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_QUERY_SUCCESS,
      payload: quote,
   
    
   
    });
  });

  test("fetchQueryData dispatches failure on axios error", async () => {

    const errorMessage = "Network Error Message";
    (axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    
    const dispatch = jest.fn();

    await fetchQuerydata()(dispatch);

    
    // expect(dispatch).toHaveBeenCalledWith({ type: FETCH_QUERY });

    expect(dispatch).toHaveBeenCalledWith({
      type: FETCH_QUERY_FAILURE,
      payload: errorMessage, 
    });
  });
});


