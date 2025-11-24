
import { render, screen, fireEvent } from "@testing-library/react";
import SearchUsers from "../Pages/SearchUsers";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

jest.mock("axios");

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

const mockStore = configureStore([]);

describe("SearchUsers Component", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: { email: "demo@gmail.com", username: "tester" }, isAuthenticated: true },
    });
    mockNavigate.mockClear();
  });

  test("renders users from API and navigates on click", async () => {

    axios.get.mockResolvedValueOnce({
      data: {
        users: [{ id: 1, firstName: "John", lastName: "Doe", username: "john", image: "" }],
      },
    });

    render(
      <MemoryRouter>
        <Provider store={store}>
          <SearchUsers />
        </Provider>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole("searchbox"), { target: { value: "John" } });

    
    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@john")).toBeInTheDocument();

    fireEvent.click(screen.getByText("John Doe"));
    expect(mockNavigate).toHaveBeenCalledWith("/userprofile/1");
  });
});