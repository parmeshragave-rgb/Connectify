import { render, screen } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import QuotesPage from "../Pages/QuotesPage";
import { MemoryRouter } from "react-router-dom";

const mockStoreQ = configureStore([]);

jest.mock("../Redux/Quotes/QuotesActions", () => ({
  fetchQuerydata: jest.fn(() => ({ type: "FETCH_QUERY" })),
}));

jest.mock("../Components/SkeletonCard", () => () => <div data-testid="skeleton" />);

const mockNavigateQ = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigateQ,
}));

describe("QuotesPage", () => {
  test("redirects to login when unauthenticated", () => {
    const store = mockStoreQ({ auth: { user: null }, quotes: { loading: false, quotes: [], error: "" } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuotesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigateQ).toHaveBeenCalledWith("/login");
  });

  test("shows skeletons while loading", () => {
    const store = mockStoreQ({ auth: { user: { username: "a" } }, quotes: { loading: true, quotes: [], error: "" } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuotesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByTestId("skeleton").length).toBeGreaterThanOrEqual(1);
  });

  test("shows error message when error present", () => {
    const store = mockStoreQ({ auth: { user: { username: "a" } }, quotes: { loading: false, quotes: [], error: "boom" } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuotesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("boom")).toBeInTheDocument();
  });

  test("renders quotes when present", () => {
    const quotes = [{ author: "alice", quote: "hello world", id: 1 }];
    const store = mockStoreQ({ auth: { user: { username: "a" } }, quotes: { loading: false, quotes, error: "" } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <QuotesPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/quotes library/i)).toBeInTheDocument();
    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/"hello world"/i)).toBeInTheDocument();
  });
});




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