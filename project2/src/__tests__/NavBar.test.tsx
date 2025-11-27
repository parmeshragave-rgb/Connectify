
import { render, screen, fireEvent, within } from "@testing-library/react";
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

    
    expect(screen.getByText(/j/i)).toBeInTheDocument();
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

   
    fireEvent.click(screen.getAllByText(/j/i)[0]);

    const HomeBtn = screen.getByText(/Home/i);
    fireEvent.click(HomeBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/");
     

    const UsersBtn = screen.getByText(/User/i);
    fireEvent.click(UsersBtn );
    expect(mockNavigate).toHaveBeenCalledWith('/search');

    const likeBtn = screen.getByText(/Liked/i);
    fireEvent.click(likeBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/liked");

    const quotesBtn = screen.getByText(/Quotes/i);
    fireEvent.click(quotesBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/quotes");

    const logoutBtn = screen.getByText(/Logout/i);
    fireEvent.click(logoutBtn);

    expect(store.getActions()).toContainEqual({ type: "LOGOUT" });
    expect(mockNavigate).toHaveBeenCalledWith("/login");

  
    fireEvent.click(screen.getAllByText(/j/i)[0]);
    const profileMenu = screen.getByText(/Profile/i);
    fireEvent.click(profileMenu);
    expect(mockNavigate).toHaveBeenCalledWith('/profile');
  });

  test('authenticated menu displays username and menu actions', () => {
    const store = mockStore({ auth: { isAuthenticated: true, user: { username: 'sam', picture: '' } } });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/^s$/i));
    expect(screen.getByText('sam')).toBeInTheDocument();

    const profileMenuItem = screen.getByText(/Profile/i);
    fireEvent.click(profileMenuItem);
    expect(mockNavigate).toHaveBeenCalledWith('/profile');

    fireEvent.click(screen.getByText(/^s$/i));
    const logoutItem = screen.getByText(/Logout/i);
    fireEvent.click(logoutItem);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('drawer navigation when authenticated shows all routes', () => {
    const store = mockStore({ auth: { isAuthenticated: true, user: { username: 'sam' } } });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const btns = container.querySelectorAll('button');
    const menuBtn = btns[btns.length - 1];
    fireEvent.click(menuBtn);
    const drawer = screen.getByRole('dialog');
    const w = within(drawer);
    fireEvent.click(w.getByText(/Home/i));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    fireEvent.click(menuBtn);
    fireEvent.click(w.getByText(/Users/i));
    expect(mockNavigate).toHaveBeenCalledWith('/search');

    fireEvent.click(menuBtn);
    fireEvent.click(w.getByText(/Liked/i));
    expect(mockNavigate).toHaveBeenCalledWith('/liked');

    fireEvent.click(menuBtn);
    fireEvent.click(w.getByText(/Quotes/i));
    expect(mockNavigate).toHaveBeenCalledWith('/quotes');
  });

  test('logo click navigates home and desktop login navigates', () => {
    const storeAuth = mockStore({ auth: { isAuthenticated: true, user: { username: 'sam' } } });
    render(
      <Provider store={storeAuth}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Connectify'));
    expect(mockNavigate).toHaveBeenCalledWith('/');

    const storeUnauth = mockStore({ auth: { isAuthenticated: false, user: null } });
    render(
      <Provider store={storeUnauth}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Login/i));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('drawer profile and logout when authenticated', () => {
    const store = mockStore({ auth: { isAuthenticated: true, user: { username: 'sam' } } });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const btns = screen.getAllByRole('button');
    const menuBtn = btns[btns.length - 1];
    fireEvent.click(menuBtn);

    const drawer = screen.getByRole('dialog');
    const w = within(drawer);

    fireEvent.click(w.getByText(/Profile/i));
    expect(mockNavigate).toHaveBeenCalledWith('/profile');

    fireEvent.click(menuBtn);
    fireEvent.click(w.getByText(/Logout/i));
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  test('drawer routes when unauthenticated', () => {
    const store = mockStore({ auth: { isAuthenticated: false, user: null } });

    const { container } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </Provider>
    );

    const iconButtons = container.querySelectorAll('button');
    const menuBtn = iconButtons[iconButtons.length - 1];
    fireEvent.click(menuBtn);

    const loginListItem = screen.getByText(/Login \/ Sign Up/i);
    fireEvent.click(loginListItem);
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });
});