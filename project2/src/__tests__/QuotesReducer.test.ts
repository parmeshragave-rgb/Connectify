
import Quotereducer , { QuotesInitialState } from "../Redux/Quotes/QuotesReducer";
import { FETCH_QUERY,FETCH_QUERY_FAILURE,FETCH_QUERY_SUCCESS } from "../Redux/Quotes/QuotesActions"



describe("QuotesReducer", () => {
  const initialState: QuotesInitialState = {
    loading: false,
    quotes: [],
    error: "",
  };

  test("returns initial state when called without state", () => {
    const result = Quotereducer(undefined, { type: "UNKNOWN" } as any);
    expect(result).toEqual(initialState);
  });

  test("handles FETCH_QUERY action", () => {
    const action = { type: FETCH_QUERY };
    const result = Quotereducer(initialState, action as any);
    expect(result.loading).toBe(true);
    expect(result.quotes).toEqual([]);
    expect(result.error).toBe("");
  });

  test("handles FETCH_QUERY_SUCCESS action", () => {
    const payload = [{ id: 1, name: "parmesh" }];
    const action = { type: FETCH_QUERY_SUCCESS, payload } ;
    const result = Quotereducer({ ...initialState, loading: true }, action);
    expect(result.loading).toBe(false);
    expect(result.quotes).toEqual(payload);
    expect(result.error).toBe("");
  });

  test("handles FETCH_QUERY_FAILURE action", () => {
    const action = { type: FETCH_QUERY_FAILURE, payload: "error" } as any;
    const result = Quotereducer({ ...initialState, loading: true }, action);
    expect(result.loading).toBe(false);
    expect(result.quotes).toEqual([]);
    expect(result.error).toBe("error");
  });
});
