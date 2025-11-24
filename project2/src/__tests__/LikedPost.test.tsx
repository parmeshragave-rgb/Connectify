
import { render, screen, fireEvent } from "@testing-library/react";
import LikedPage from "../Pages/LikedPosts";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";

const mockStore = configureStore([]);
const mockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));


jest.mock("../Redux/Users/userActions", () => ({
  fetchUsersData: () => ({ type: "FETCH_USERS" }),
}));

describe("LikedPage Component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("renders 'No liked posts yet' when no posts", () => {
    const store = mockStore({
      auth: { user: { email: "demo@gmail.com" } },
      users: { userdata: [] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LikedPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("No liked posts yet.")).toBeInTheDocument();
  });

  test("renders liked posts from localStorage", () => {
    localStorage.setItem(
      "likedPostsdemo@gmail.com",
      JSON.stringify([
        { id: 1, title: "Post Title", body: "Post body", views: 10, userId: 5 },
      ])
    );

    const store = mockStore({
      auth: { user: { email: "demo@gmail.com" } },
      users: { userdata: [{ id: 5, image: "" }] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LikedPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText("Post Title")).toBeInTheDocument();
    expect(screen.getByText("Post body")).toBeInTheDocument();
  });

  test("removes a liked post when clicking remove button", () => {
    localStorage.setItem(
      "likedPostsdemo@gmail.com",
      JSON.stringify([
        { id: 1, title: "Post Title", body: "Post body", views: 10, userId: 5 },
      ])
    );

    const store = mockStore({
      auth: { user: { email: "demo@gmail.com" } },
      users: { userdata: [{ id: 5, image: "" }] },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LikedPage />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText("Remove"));

    expect(
      screen.getByText("No liked posts yet.")
    ).toBeInTheDocument();
  });
});