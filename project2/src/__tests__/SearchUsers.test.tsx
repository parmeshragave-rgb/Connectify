import { render, screen, fireEvent } from "@testing-library/react";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import SearchUsers from "../Pages/SearchUsers";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";

jest.mock("axios");
jest.mock("lodash", () => ({ debounce: (fn: unknown) => fn }));

const mockStore = configureStore([]);
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("SearchUsers component", () => {
  beforeEach(() => jest.clearAllMocks());

  test("redirects to login when not authenticated", () => {
    const store = mockStore({ auth: { user: null } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchUsers />
        </MemoryRouter>
      </Provider>
    );

    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  test("renders users and navigates when clicked", async () => {
    
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { users: [], total: 0 } });
  
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { users: [{ id: 5, firstName: "Jane", lastName: "Doe", username: "jane", image: "" }], total: 1 } });
    const store = mockStore({ auth: { user: { username: "tester" } } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchUsers />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: "Jane" } });

    expect(await screen.findByText(/jane doe/i)).toBeInTheDocument();
    expect(screen.getByText(/@jane/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/jane doe/i));
    expect(mockNavigate).toHaveBeenCalledWith("/userprofile/5");
  });

  test("shows no results then shows error when axios fails", async () => {
    (axios.get as jest.Mock).mockResolvedValueOnce({ data: { users: [], total: 0 } });
    const store = mockStore({ auth: { user: { username: "tester" } } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <SearchUsers />
        </MemoryRouter>
      </Provider>
    );

    expect(await screen.findByText(/no match found/i)).toBeInTheDocument();

    (axios.get as jest.Mock).mockRejectedValueOnce("serverfail");
    fireEvent.change(screen.getByPlaceholderText(/Search/i), { target: { value: "x" } });

    expect(await screen.findByText(/serverfail/i)).toBeInTheDocument();
  });
});
