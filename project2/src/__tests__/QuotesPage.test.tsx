
import { render, screen } from "@testing-library/react";
import QuotesPage from "../Pages/QuotesPage";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";


jest.mock("../Redux/Quotes/QuotesActions", () => ({
  fetchQuerydata: jest.fn(() => ({ type: "FETCH_QUOTES" }))
}));

const mockStore = configureStore([]);

describe("QuotesPage Component", () => {
  test("renders Loading when loading is true", () => {
    const store = mockStore({
      quotes: { loading: true, quotes: [], error: "" }
    });

    render(
      <Provider store={store}>
        <QuotesPage />
      </Provider>
    );

    expect(screen.getByText("Loading")).toBeInTheDocument();
  });

  test("renders error message when error exists", () => {
    const store = mockStore({
      quotes: { loading: false, quotes: [], error: "Error fetching quotes" }
    });

    render(
      <Provider store={store}>
        <QuotesPage />
      </Provider>
    );

    expect(screen.getByText("Error fetching quotes")).toBeInTheDocument();
  });

  test("renders quotes when data is available", () => {
    const store = mockStore({
      quotes: {
        loading: false,
        error: "",
        quotes: [
          { author: "Albert Einstein", quote: "Life is like riding a bicycle." }
        ]
      }
    });

    render(
      <Provider store={store}>
        <QuotesPage />
      </Provider>
    );

    expect(screen.getByText("Quotes Library")).toBeInTheDocument();
    expect(screen.getByText("Albert Einstein")).toBeInTheDocument();
    expect(screen.getByText('"Life is like riding a bicycle."')).toBeInTheDocument();
  });
});