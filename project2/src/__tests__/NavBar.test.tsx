
import { render, screen, fireEvent } from "@testing-library/react";
import Navbar from "../Components/Navbar";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate
}));

jest.mock("../Redux/auth/authActions", () => ({
  logout: () => ({ type: "LOGOUT" })
}));

describe("Navbar Component", () => {
  test("renders login button when not authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, user: null }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Connectify")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  test("renders avatar when user is authenticated", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: { username: "john", picture: "" }
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    
    expect(screen.getByText("j")).toBeInTheDocument();
  });

  test("logout dispatches action and navigates to home", () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: { username: "john", picture: "" }
      }
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

   
    fireEvent.click(screen.getByText("j"));

    const logoutBtn = screen.getByText("Logout");
    fireEvent.click(logoutBtn);

    expect(store.getActions()).toContainEqual({ type: "LOGOUT" });
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});