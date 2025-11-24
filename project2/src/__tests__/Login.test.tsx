import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import Login from "../Pages/Login";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_TEST_CLIENT_ID = "test-client-id";

const mockStore = configureStore([]);

describe("Login Page", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      auth: { user: null, isAuthenticated: false },
    });
  });

  test("renders login form", () => {
    render(
      <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </GoogleOAuthProvider>
      </Provider>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  test("toggles to Sign Up mode", () => {
    render(
      <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_TEST_CLIENT_ID}>
          <MemoryRouter>
            <Login />
          </MemoryRouter>
        </GoogleOAuthProvider>
      </Provider>
    );

    const toggleButton = screen.getByText("New user? Sign up");
    fireEvent.click(toggleButton);

    expect(
      screen.getByRole("heading", { name: "Sign up" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });
});
